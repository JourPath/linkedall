import { z } from "zod";

export const signUpSchema = z
  .object({
    emailAddress: z.string().email(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export const signInSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string(),
});
