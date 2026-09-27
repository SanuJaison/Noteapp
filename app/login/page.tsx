"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  console.log(userData);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const { email, password } = userData;
    if (!email || !password) {
      alert("Please fill the form completely");
    } else {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log(res);
      if (res?.ok == true) {
        alert("Login successfull");
        window.location.href = "/notes";
      } else {
        alert("Invalid credentials");
        setUserData({ email: "", password: "" });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-blue-400 p-4 rounded w-100">
        <h1 className="text-2xl font-bold text-white">Miniso</h1>
        <p className="text-white">Note Taking Made Easier</p>
        <form onSubmit={handleLogin} action="">
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
          <div className="mt-5 mb-3 w-full flex items-center text-white">
            <button type="submit" className="bg-blue-700 px-3 py-2 rounded w-full font-semibold">
              Login
            </button>
          </div>
          <p className="text-sm text-white w-full text-center">
            New User? Click here to{" "}
            <Link href={"/register"}>Register</Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}
