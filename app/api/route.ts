import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json(); // Parse the JSON body
    console.log("Data received:", body); // Log the received data

    return NextResponse.json({ message: "Data received successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json({ message: "Failed to process request" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "GET method not allowed for this route" }, { status: 405 });
}
