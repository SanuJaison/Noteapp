import mongoose from "mongoose";

export interface iuser {
  name: string;
  email: string;
  password: string;
}

const userSchma = new mongoose.Schema<iuser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.models.users || mongoose.model<iuser>("users", userSchma);
