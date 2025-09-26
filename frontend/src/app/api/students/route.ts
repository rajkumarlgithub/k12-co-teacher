import { NextRequest, NextResponse } from 'next/server';

// Hardcoded API Gateway endpoint
const API_ENDPOINT = "https://8le5se2aja.execute-api.us-west-2.amazonaws.com/Dev/getStudentsForClass";

// Debug logging
console.log("Available env variables at runtime:", process.env);
console.log("Using API_ENDPOINT:", API_ENDPOINT);

export async function POST(request: NextRequest) {
  try {
    // Log incoming request
    const body = await request.json();
    console.log("Incoming request body:", body);

    // Call the real API
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log("API response:", data);

    // Forward API response with same status
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error("Students API Error:", error);

    // Always return JSON error
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
