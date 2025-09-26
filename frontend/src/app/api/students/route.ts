import { NextRequest, NextResponse } from 'next/server';

// Debug logging
console.log("Available env variables:", process.env);
console.log("STUDENTS_API_ENDPOINT:", process.env.STUDENTS_API_ENDPOINT);

// Use env variable if available, otherwise fallback
const API_ENDPOINT =
  process.env.STUDENTS_API_ENDPOINT ||
  "https://8le5se2aja.execute-api.us-west-2.amazonaws.com/Dev/getStudentsForClass";

export async function POST(request: NextRequest) {
  try {
    // Parse incoming request
    const body = await request.json();

    // Call the real API
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // Forward API response with same status
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('Students API Error:', error);

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
