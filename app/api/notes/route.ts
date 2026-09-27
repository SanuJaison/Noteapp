import { connection } from "@/lib/dbConnection";
import notes from "@/models/notesModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connection();
    const body = await req.json();
    const newNote = await notes.create(body);
    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something wnt wrong" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connection();
    const searchParams = req.nextUrl.searchParams
    const email = searchParams.get("email")
    const allNotes = await notes.find({userMail: email})

    // const allNotes = await notes.find();
    return NextResponse.json(allNotes, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something wnt wrong" },
      { status: 500 },
    );
  }
}
