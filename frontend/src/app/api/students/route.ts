import { NextRequest, NextResponse } from 'next/server';

// Hardcoded API Gateway endpoint (fallback)
const API_ENDPOINT =
  process.env.STUDENTS_API_ENDPOINT ||
  "https://8le5se2aja.execute-api.us-west-2.amazonaws.com/Dev/getStudentsForClass";

// Debug logging
console.log("Available env variables at runtime:", process.env);
console.log("Using API_ENDPOINT:", API_ENDPOINT);

export async function POST(request: NextRequest) {
  try {
    // Parse incoming request
    const body = await request.json();
    console.log("Incoming request body:", body);

    // Lambda via API Gateway expects the JSON as the raw body string
    const lambdaBody = JSON.stringify(body);

    console.log("Forwarding body to Lambda:", lambdaBody);

    // Call the Lambda API
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: lambdaBody,
    });

    const data = await response.json();
    console.log("API response:", data);

    // Forward response with correct status
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("Students API Error:", error);

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
