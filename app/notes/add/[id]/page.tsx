"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaNotesMedical, FaXmark } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";

export default function EditNotes() {
  const router = useRouter();
  const { status } = useSession();
  const { id } = useParams();

  const [noteData, setNoteData] = useState({
    title: "",
    description: "",
    color: "",
  });

  useEffect(() => {
    if (id) getNoteDetails();
  }, [id]);

  const getNoteDetails = async () => {
    try {
      const res = await fetch(`/api/notes/${id}`);
      if (res.status === 200) {
        const serverResponse = await res.json();
        setNoteData({
          title: serverResponse.title || "",
          description: serverResponse.description || "",
          color: serverResponse.color || "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateNote = async () => {
    try {
      const { title, description, color } = noteData;
      if (!title || !description || !color) {
        return alert(`Fill the form completely`);
      }
      const res = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noteData),
      });

      if (res.status === 200) {
        alert(`Note Updated Successfully`);
        router.push("/notes");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (status === "loading") {
    return <p className="text-center mt-10 text-xl">Loading....</p>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  return (
    <div className="md:mx-40 m-5">
      {/* header */}
      <div className="mb-10 flex justify-between items-center">
        <Link href={"/"} className="text-xl flex items-center text-blue-400">
          <FaNotesMedical />
          <span>MINISO</span>
        </Link>
      </div>

      {/* body */}
      <div className="flex items-center justify-center md:mt-20 mt-5">
        <div className="border border-gray-200 rounded p-5 w-100">
          <h1 className="text-2xl font-bold text-blue-500">MINISO</h1>
          <p className="text-gray-500">Edit Notes</p>

          <div className="flex items-center justify-between my-5">
            <Link href="/notes" className="font-bold text-xl">
              <FaXmark />
            </Link>
            <button
              onClick={updateNote}
              className="bg-green-500 rounded-xl text-white px-2 flex items-center"
            >
              <TiTick />
              Update
            </button>
          </div>

          <div className="flex items-center my-7">
            <p className="text-gray-400 font-bold">Theme</p>
            <div className="flex justify-evenly items-center w-full">
              <div
                onClick={() => setNoteData({ ...noteData, color: "red" })}
                className={`bg-red-400 rounded-full w-5 h-5 cursor-pointer ${
                  noteData.color === "red" ? "border-2 border-black" : ""
                }`}
              ></div>
              <div
                onClick={() => setNoteData({ ...noteData, color: "yellow" })}
                className={`bg-yellow-400 rounded-full w-5 h-5 cursor-pointer ${
                  noteData.color === "yellow" ? "border-2 border-black" : ""
                }`}
              ></div>
              <div
                onClick={() => setNoteData({ ...noteData, color: "blue" })}
                className={`bg-blue-400 rounded-full w-5 h-5 cursor-pointer ${
                  noteData.color === "blue" ? "border-2 border-black" : ""
                }`}
              ></div>
              <div
                onClick={() => setNoteData({ ...noteData, color: "green" })}
                className={`bg-green-400 rounded-full w-5 h-5 cursor-pointer ${
                  noteData.color === "green" ? "border-2 border-black" : ""
                }`}
              ></div>
            </div>
          </div>

          <div className="mt-5 mb-3 w-full">
            <input
              value={noteData.title}
              onChange={(e) =>
                setNoteData({ ...noteData, title: e.target.value })
              }
              type="text"
              placeholder="Title"
              className="rounded p-3 w-full border"
            />
          </div>
          <div className="mt-5 mb-3 w-full">
            <textarea
              value={noteData.description}
              onChange={(e) =>
                setNoteData({ ...noteData, description: e.target.value })
              }
              placeholder="Description"
              rows={5}
              className="rounded p-3 w-full border"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
