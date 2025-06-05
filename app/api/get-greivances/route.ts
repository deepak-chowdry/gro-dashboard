import { NextResponse } from "next/server";

// Replace this with your actual grievances API endpoint
const GRIEVANCES_API_URL = process.env.GRM_API_URL;
const GRM_API_TOKEN = process.env.GRM_API_TOKEN;
const USER_ID = process.env.USER_ID;

export async function GET() {
  try {
    const response = await fetch(
      `${GRIEVANCES_API_URL}/grievances/user/${USER_ID}`,
      {
        headers: {
          Authorization: `Bearer ${GRM_API_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching grievances:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
