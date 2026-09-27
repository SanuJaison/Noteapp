import mongoose from "mongoose";

export interface inote {
  _id?: string;
  title: string;
  description: string;
  color: string;
  userMail: string;
  createdAt?: string;
  updatedAt?: string;
}

const notesSchma = new mongoose.Schema<inote>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    userMail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.notes ||
  mongoose.model<inote>("notes", notesSchma);
