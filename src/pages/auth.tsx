import { useEffect } from "react";
import { useRouter } from "next/router";

import AuthForm from "@/components/auth-form";

import "../app/globals.css";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      router.push("/home");
    }
  }, [router]);

  return (
    <main className="min-h-screen flex-col items-center justify-between">
      <AuthForm />
    </main>
  );
};

export default Page;
