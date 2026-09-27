import { connection } from "@/lib/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import users from "@/models/userModel";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    await connection();
    const { name, email, password } = await req.json();
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User Already Existis" },
        { status: 400 },
      );
    } else {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const newUser = await users.create({
        name,
        email,
        password: encryptedPassword,
      });
      return NextResponse.json(
        { message: "User Registered Successfully Existis", data: newUser },
        { status: 201 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Something wnt wrong" },
      { status: 500 },
    );
  }
}
