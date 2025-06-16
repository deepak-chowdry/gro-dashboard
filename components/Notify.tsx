import { useMutation, useQuery } from "convex/react";
import { ElevenLabsClient } from "elevenlabs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "../convex/_generated/api";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

const client = new ElevenLabsClient({
  apiKey: process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY,
});

type Conversation = {
  _id: string;
  groQuery: string;
  convoId: string;
  response?: string;
};

const Notify = ({ greivanceId }: { greivanceId: string }) => {
  const [message, setMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [conversation, setConversation] = useState<Conversation[]>([]);
  const conversationsData = useQuery(api.conversation.getConversation, {
    greivanceId,
  });
  const createConversation = useMutation(api.conversation.createConversation);
  const agentId = process.env.NEXT_PUBLIC_AGENT_ID || "";
  const agentPhoneNumberId =
    process.env.NEXT_PUBLIC_AGENT_PHONE_NUMBER_ID || "";

  // Sync local state with query result
  useEffect(() => {
    if (Array.isArray(conversationsData)) {
      setConversation(conversationsData);
    }
  }, [conversationsData]);

  const handleNotify = async () => {
    try {
      console.log(message, phoneNumber);

      const response = await client.conversationalAi.twilioOutboundCall({
        agent_id: agentId,
        agent_phone_number_id: agentPhoneNumberId,
        to_number: phoneNumber,
        conversation_initiation_client_data: {
          dynamic_variables: {
            user_name: "Madhu",
            information: message,
          },
        },
      });
      console.log(response);

      const data = response?.callSid;
      console.log(data);

      await createConversation({
        groQuery: message,
        convoId: data as string,
        response: "",
        greivanceId,
      });
      toast.success("Conversation started successfully");
    } catch (error) {
      console.error("Failed to start conversation:", error);
      toast.error(
        "Failed to start conversation. Please ensure microphone access is granted."
      );
    }
  };

  // const handleGetConversation = async () => {
  //     const conversation = await getConversation();
  //     console.log(conversation);
  //     setConversation(conversation)
  // }

  // useEffect(() => {
  //     handleGetConversation()
  // }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Notify User</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
                className="h-24"
              />
              <Input
                value={phoneNumber}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/[^\d+]/g, "");
                  if (
                    numericValue.startsWith("+") ||
                    !isNaN(Number(numericValue))
                  ) {
                    setPhoneNumber(numericValue);
                  }
                }}
                type="tel"
                placeholder="Enter phone number"
                className="h-12"
              />
              <Button
                disabled={!message || !phoneNumber}
                onClick={handleNotify}
              >
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle>Conversation History</CardTitle>
          </CardHeader>
          <CardContent>
            {conversation.length > 0 ? (
              conversation.map((item) => (
                <div
                  key={item._id}
                  className="mb-4 p-2 border-b last:border-b-0 space-y-3"
                >
                  <p className="font-semibold">Query: {item.groQuery}</p>
                  <div>
                    <label htmlFor="" className="font-semibold">
                      Summary:
                    </label>
                    <p className="text-sm text-gray-700">
                      {item.response || (
                        <span className="italic text-gray-400">
                          No response yet
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic">
                No conversation history found.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Notify;
