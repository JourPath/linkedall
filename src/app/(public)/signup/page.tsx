import { Metadata } from "next";
import SignUpForm from "../../auth/_components/sign-up-form";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default async function SignUp() {
  return (
    <>
      <div className="bg-[--light-blue-1] h-screen flex justify-around">
        <div className="md:w-1/2 lg:w-1/3 ">
          <SignUpForm />
        </div>
      </div>
    </>
  );
}
