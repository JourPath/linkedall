import LoginForm from "@/app/auth/_components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default async function Login() {
  return (
    <>
      <div className="bg-[--light-blue-1] h-screen flex justify-around">
        <div className="md:w-1/2 lg:w-1/3 ">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
