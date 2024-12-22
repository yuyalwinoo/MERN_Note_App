import { z } from "zod";

export const authSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export const signupSchema = z.object({
    username: z.string().min(3,{ message: "Password must be at least 3 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export const noteSchema = z.object({
    title: z.string().min(1,{message: "Enter Title"}),
    content: z.string().min(5,{ message: "Password must be at least 6 characters long" }),
    // tags: z.string().min(1,{message: "Enter tags"}),
})