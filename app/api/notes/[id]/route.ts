import { connection } from "@/lib/dbConnection";
import notes from "@/models/notesModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connection();
    const { id } = await params;
    const noteData = await notes.findById({ _id: id });
    return NextResponse.json(noteData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something wnt wrong" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connection();
    const { id } = await params;
    const reqBody = await req.json();
    const updatedNoteData = await notes.findByIdAndUpdate(
      { _id: id },
      reqBody,
      { new: true },
    );
    return NextResponse.json(updatedNoteData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something wnt wrong" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connection();
    const { id } = await params;

    const deletedNoteData = await notes.findByIdAndDelete({ _id: id });
    return NextResponse.json(deletedNoteData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something wnt wrong" },
      { status: 500 },
    );
  }
}
