import { NextResponse } from "next/server";
import { db } from "@/db";
import { usersTable } from "@/db/schema";

// GET Endpoint: Fetch all users
export async function GET() {
  try {
    const allUsers = await db.select().from(usersTable);
    return NextResponse.json(allUsers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// POST Endpoint: Insert a new user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.name || !body.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newUser = await db.insert(usersTable).values({
      name: body.name,
      email: body.email,
    }).returning();

    return NextResponse.json(newUser[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
