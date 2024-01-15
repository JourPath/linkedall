import { z } from "zod";

export const newListFormSchema = z.object({
  list_name: z.string().min(1, {
    message: "Username must be at least 1 character",
  }),
});

export const joinListCodeSchema = z.object({
  short_id: z.string().toUpperCase().length(6, {
    message: "List code must be 6 characters long",
  }),
});

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

export const profileSchema = z.object({
  full_name: z.string(),
  linked_in: z.string(),
  bio: z.string().max(200, {
    message: "Bio must be less than 200 characters",
  }),
});
