import { NextResponse } from "next/server";
import { db } from "@/db";
import { restuarantTable } from "@/db/schema";

// GET Endpoint: Fetch all users
export async function GET() {
  try {
    const allUsers = await db.select().from(restuarantTable);
    return NextResponse.json(allUsers, { status: 200, headers: {
      'Access-Control-Allow-Origin': '*', // Replace * with your specific domain in production
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    } });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}