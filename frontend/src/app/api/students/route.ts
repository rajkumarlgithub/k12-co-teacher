import { NextRequest, NextResponse } from 'next/server';

const endpoint = process.env.STUDENTS_API_ENDPOINT;

if (!endpoint) {
  throw new Error("STUDENTS_API_ENDPOINT is not defined");
}
const API_ENDPOINT: string = endpoint;


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Students API Error:', error);
    return NextResponse.json(
      { statusCode: 500, body: JSON.stringify({ error: 'Internal server error' }) },
      { status: 500 }
    );
  }
}