import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import crypto from "crypto";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "webhook listening" }, { status: 200 });
}

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: NextRequest) {
  const secret = process.env.ELEVENLABS_WEBHOOK_SECRET; // Add this to your env variables
  const { event, error } = await constructWebhookEvent(req, secret);
  if (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  }

  if (event.type === "post_call_transcription") {
    console.log("event data", JSON.stringify(event.data, null, 2));
    await client.mutation(api.conversation.updateConversation, {
      convoId: event.data.metadata.phone_call.call_sid,
      response: event.data.analysis.transcript_summary,
    });
    console.log("Updated the conversation");
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

const constructWebhookEvent = async (req: NextRequest, secret?: string) => {
  const body = await req.text();
  const signature_header = req.headers.get("ElevenLabs-Signature");
  console.log(signature_header);

  if (!signature_header) {
    return { event: null, error: "Missing signature header" };
  }

  const headers = signature_header.split(",");
  const timestamp = headers.find((e) => e.startsWith("t="))?.substring(2);
  const signature = headers.find((e) => e.startsWith("v0="));

  if (!timestamp || !signature) {
    return { event: null, error: "Invalid signature format" };
  }

  // Validate timestamp
  const reqTimestamp = Number(timestamp) * 1000;
  const tolerance = Date.now() - 30 * 60 * 1000;
  if (reqTimestamp < tolerance) {
    return { event: null, error: "Request expired" };
  }

  // Validate hash
  const message = `${timestamp}.${body}`;

  if (!secret) {
    return { event: null, error: "Webhook secret not configured" };
  }

  const digest =
    "v0=" + crypto.createHmac("sha256", secret).update(message).digest("hex");
  console.log({ digest, signature });
  if (signature !== digest) {
    return { event: null, error: "Invalid signature" };
  }

  const event = JSON.parse(body);
  return { event, error: null };
};
