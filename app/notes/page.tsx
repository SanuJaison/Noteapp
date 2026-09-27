"use client";

import { FaNotesMedical } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { IoIosPower } from "react-icons/io";
import { IoTimeOutline } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface INote {
  _id: string;
  title: string;
  description: string;
  color: string;
  createdAt?: string;
}

const colorMap: Record<string, string> = {
  red: "bg-red-400",
  yellow: "bg-yellow-400",
  blue: "bg-blue-400",
  green: "bg-green-400",
};

export default function Notes() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [allNotes, setAllNotes] = useState<INote[]>([]);

  const fetchAllNotes = async () => {
    try {
      if (!session?.user?.email) return;
      const res = await fetch(`/api/notes?email=${session?.user?.email}`);
      if (res.status === 201 || res.status === 200) {
        const serverResponse = await res.json();
        setAllNotes(serverResponse);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        alert(`Note deleted successfully`);
        setAllNotes((prev) => prev.filter((note) => note._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchAllNotes();
    }
  }, [session?.user?.email]);

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

        <div className="text-xl flex items-center text-blue-400">
          <p className="me-5 flex items-center gap-2">
            <FaRegUser /> {session?.user?.name}
          </p>
          <IoIosPower className="cursor-pointer" onClick={() => signOut()} />
        </div>
      </div>

      {/* notes */}
      <div className="rounded p-5 bg-gray-200">
        <h1 className="text-4xl text-blue-600">MY Notes</h1>

        <div className="lg:grid grid-cols-4 gap-5 mt-10">
          {allNotes?.length > 0 &&
            allNotes.map((notes) => (
              <div
                key={notes._id}
                className={`rounded-xl ${
                  colorMap[notes.color] || "bg-orange-400"
                } mt-5 lg:mt-0 p-5`}
              >
                <div className="flex items-center justify-between text-gray-600 mb-3">
                  <h1 className="font-semibold text-lg">{notes.title}</h1>
                  <Link href={`/notes/add/${notes._id}`}>
                    <FaRegEdit className="text-blue-500 text-xl" />
                  </Link>
                </div>

                <hr className="text-gray-200 mb-3" />
                <p>{notes.description}</p>

                <div className="md:flex items-center justify-between text-gray-600 mt-3">
                  <p className="flex items-center gap-2 text-sm">
                    <IoTimeOutline />{" "}
                    {notes.createdAt
                      ? new Date(notes.createdAt).toLocaleDateString()
                      : ""}
                  </p>
                  <button onClick={() => deleteNote(notes._id)}>
                    <FaRegTrashCan className="text-red-600" />
                  </button>
                </div>
              </div>
            ))}

          <Link
            href={"/notes/add"}
            className="border border-dashed rounded-xl p-5 flex justify-center items-center flex-col mt-5 lg:mt-0"
          >
            <FaRegEdit className="text-xl" />
            New Note
          </Link>
        </div>
      </div>
    </div>
  );
}