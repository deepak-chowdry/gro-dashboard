import { NextRequest, NextResponse } from "next/server";

// Replace this with your actual grievances API endpoint
const GRIEVANCES_API_URL = process.env.GRM_API_URL;
const GRM_API_TOKEN = process.env.GRM_API_TOKEN;

export async function PUT(req: NextRequest) {
  // Parse the URL to get the query parameters
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const body = await req.json();

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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: body.status,
        resolution_notes: body.resolution_notes,
        officer_closed_by: body.officer_closed_by,
        final_status: body.final_status,
        grievance_closing_date: new Date(body.grievance_closing_date).toISOString(),
      }),
    });
    // console.log(response)
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

// {
//   "status": "string",
//   "resolution_notes": "string",
//   "officer_closed_by": "string",
//   "final_status": "string",
//   "grievance_closing_date": "string"
// }
