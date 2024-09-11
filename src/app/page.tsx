"use client";

import LoginGoogleButton from "./auth/sign-in/components/LoginGoogleButton";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { loginGoogle } from "@/actions/authGoogle.actions";

export default function Home() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  console.log(code);

  // useEffect(() => {
  //   if (code) {
  //     loginGoogle(code).catch((err) => {
  //       console.error("Login Google failed: ", err);
  //     })
  //   }
  // }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <a href="http://localhost:3000/auth/sign-in">
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign In</button>
      </a>
      <a href="http://localhost:3000/auth/sign-up">
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign Up</button>
      </a>
      <LoginGoogleButton/>
    </div>
  );
}
