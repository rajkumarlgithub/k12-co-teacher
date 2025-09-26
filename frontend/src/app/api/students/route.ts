console.log("STUDENTS_API_ENDPOINT:", process.env.STUDENTS_API_ENDPOINT);

import { NextRequest, NextResponse } from 'next/server';

const endpoint = process.env.STUDENTS_API_ENDPOINT;

if (!endpoint) {
  throw new Error("STUDENTS_API_ENDPOINT is not defined");
}
const API_ENDPOINT: string = endpoint;

export async function POST(request: NextRequest) {
  try {
    // Parse incoming request
    const body = await request.json();

    // Call the real API
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    // Forward the API response with the same status
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('Students API Error:', error);

    // Return a clean JSON error
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
