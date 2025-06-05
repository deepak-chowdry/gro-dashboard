import { NextRequest, NextResponse } from "next/server";

// Replace this with your actual grievances API endpoint
const GRIEVANCES_API_URL = process.env.GRM_API_URL;
const GRM_API_TOKEN = process.env.GRM_API_TOKEN;

export async function PUT(req: NextRequest) {
  // Parse the URL to get the query parameters
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const { status, resolution_notes, officer_closed_by, final_status, grievance_closing_date } = await req.json();
  console.log(status, resolution_notes, officer_closed_by, final_status, grievance_closing_date)

  if (!id) {
    return NextResponse.json(
      { error: "Missing id parameter" },
      { status: 400 }
    );
  }
  try {
    const response = await fetch(`${GRIEVANCES_API_URL}/grievances/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GRM_API_TOKEN}`,
      },
      body: JSON.stringify({
        status,
        resolution_notes,
        officer_closed_by,
        final_status,
        grievance_closing_date,
      }),
    });
    const grievanceJson = await response.json();
    return NextResponse.json(grievanceJson);
  } catch (error) {
    console.error("Error fetching grievances:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
