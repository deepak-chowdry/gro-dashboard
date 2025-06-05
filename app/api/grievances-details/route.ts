import { NextRequest, NextResponse } from "next/server";

// Replace this with your actual grievances API endpoint
const GRIEVANCES_API_URL = process.env.GRM_API_URL;
const GRM_API_TOKEN = process.env.GRM_API_TOKEN;

export async function GET(req: NextRequest) {
  // Parse the URL to get the query parameters
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing id parameter" },
      { status: 400 }
    );
  }
  try {
    const response = await fetch(`${GRIEVANCES_API_URL}/grievances/${id}`, {
      headers: {
        Authorization: `Bearer ${GRM_API_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch grievances");
    }
    const grievanceJson = await response.json();
    const userId = grievanceJson.grievance.user_id.id;
    const userResponse = await fetch(`${GRIEVANCES_API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${GRM_API_TOKEN}`,
      },
    });
    if (!userResponse.ok) {
      throw new Error("Failed to fetch user");
    }
    const userData = await userResponse.json();
    return NextResponse.json({ grievance: grievanceJson.grievance, user: userData });
  } catch (error) {
    console.error("Error fetching grievances:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
