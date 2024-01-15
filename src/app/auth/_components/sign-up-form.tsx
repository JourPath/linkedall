"use client";

import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import VerificationInput from "react-verification-input";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { signUpWithEmail, signUpWithLinkedIn, verifyOTP } from "../_actions";
import { signUpSchema } from "../_actions/schema";

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const { toast } = useToast();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmit(formData: z.infer<typeof signUpSchema>) {
    setIsLoading(true);
    try {
      setEmail(formData.emailAddress);
      const response = await signUpWithEmail(formData);
      if (response?.error) {
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive",
        });
      } else {
        setConfirm(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  async function handleConfirm(token: string) {
    try {
      const response = await verifyOTP(email, token);
      if (response?.error) {
        toast({
          title: "Verification Error",
          description: response?.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log("Something wrong with sign up verification");
    }
  }

  async function signUpLinkedIn() {
    setIsLoading(true);
    try {
      const response = await signUpWithLinkedIn();
      if (response?.error) {
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive",
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  return (
    <div className="text-center rounded-xl bg-[--light-blue-1]">
      <img
        src="/LinkedAll_blue_logo.svg"
        className="w-16 inline py-4"
        alt="Blue LinkedAll Text Logo"
      />
      <h3 className="font-bold text-2xl pb-4 ">
        {confirm ? "Confirm" : "Get Started"}
      </h3>
      {confirm ? (
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl p-4">
            Please check your inbox for a confirmation code and enter it below
          </p>
          <VerificationInput
            length={6}
            validChars="0-9"
            onComplete={(token) => handleConfirm(token)}
            classNames={{
              character: "VIcharacter",
              container: "VIcontainer",
            }}
          />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="emailAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        disabled={isLoading}
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        placeholder="name@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter your email address here.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        autoCorrect="off"
                        autoCapitalize="none"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter strong password here.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        autoCorrect="off"
                        autoCapitalize="none"
                        type="password"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Confirm strong password here.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} type="submit">
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                Sign Up with Email
              </Button>
            </form>
          </Form>
          <Separator /> or continue with <Separator />
          <form action={signUpWithLinkedIn}>
            <button type="submit">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <img
                  src="/In-Blue-48.png"
                  className="w-7 inline pr-2"
                  alt="LinkedIn Logo"
                />
              )}
              <p>LinkedIn</p>
            </button>
          </form>
        </>
      )}
    </div>
  );
}

//
//             <p className="text-[--light-blue-3] text-xs">
//               By clicking &quot;Sign Up&quot; I agree to LinkedAll&apos;s <br />
//               <Link href="/policy/terms" target="_blank">
//                 Terms
//               </Link>{" "}
//               and{" "}
//               <Link href="/policy/privacy" target="_blank">
//                 Privacy Policy
//               </Link>
//               .
//             </p>
//             <p>
//               Already signed up?
//               <Link
//                 href={{
//                   pathname: "/login",
//                   query: { listid: listId },
//                 }}
//               >
//                 Log in
//               </Link>
//             </p>
//           </form>
//         </>
//       )}
//     </div>
//   );
// };
