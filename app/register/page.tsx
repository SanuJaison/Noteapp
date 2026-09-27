"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  console.log(userData);

  const handleRegister = async (e: any) => {
    e.preventDefault();

    const { name, email, password } = userData;

    if (!name || !email || !password) {
      alert("Fill the form completely");
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    console.log(res);

    const serverResponse = await res.json();
    console.log(serverResponse);

    if (res.status === 201) {
      alert(serverResponse.message);
      router.push("/login");
    } else {
      alert(serverResponse.message);
    }

    setUserData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-blue-400 p-4 rounded w-100">
        <h1 className="text-2xl font-bold text-white">Miniso</h1>
        <p className="text-white">Note Taking Made Easier</p>
        <form onSubmit={handleRegister} action="">
          <div className="mt-5 mb-3 w-full">
            <input
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              type="text"
              placeholder="Name"
              className="w-full bg-gray-100 p-3 rounded"
            />
          </div>
          <div className="mt-5 mb-3 w-full">
            <input
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              type="text"
              placeholder="Email"
              className="w-full bg-gray-100 p-3 rounded"
            />
          </div>
          <div className="mt-5 mb-3 w-full">
            <input
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              type="password"
              placeholder="Password"
              className="w-full bg-gray-100 p-3 rounded"
            />
          </div>
          <div className="mt-5 mb-3 w-full flex text-white">
            <button
              type="submit"
              className="bg-blue-700 px-3 py-2 rounded w-full font-semibold"
            >
              Register
            </button>
          </div>
          <p className="text-sm text-white w-full text-center">
            Already a User? Click here to{" "}
            <Link href={"/login"}>Login</Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}
