import { NextResponse } from "next/server";
import { db } from "@/db";
import { restuarantTable } from "@/db/schema";

// GET Endpoint: Fetch all users
export async function GET() {
  try {
    const allUsers = await db.select().from(restuarantTable);
    return NextResponse.json(allUsers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
