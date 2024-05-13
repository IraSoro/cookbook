import { useRouter } from "next/router";

import AuthForm from "@/components/auth-form";

import "../app/globals.css";

const Page = () => {
  const router = useRouter();

  const handleLogin = async () => {
    router.push("/recipes");
  };

  const handleRegister = async () => {};
  return (
    <main className="min-h-screen flex-col items-center justify-between">
      <AuthForm handleLogin={handleLogin} handleRegister={handleRegister} />
    </main>
  );
};

export default Page;
