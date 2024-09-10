"use server";

import { FormState, SignupFormSchema } from "@/lib/definitions";
import { PrismaSingleton } from "@/lib/prisma";
import bcrypt from 'bcrypt';
import { redirect } from "next/navigation";

const prisma = PrismaSingleton.getClient();

const ENDPOINT_LOGIN = "http://localhost:3000/auth/sign-in";

export async function signup(state: FormState, formData: FormData) {
    const uri = new URL(ENDPOINT_LOGIN);

    const validatedFields = SignupFormSchema.safeParse({
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { username, email, password } = validatedFields.data;

    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { username: username },
                { email: email }
            ]
        }
    });

    if (existingUser) {
        return  {
            errors: {
                username: existingUser.username === username ? ["Username already taken"] : [],
                email: existingUser.email === email ? ["Email already taken"] : [],
            }
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = await prisma.user.create({
        data: {
            username: username,
            email: email,
            password: hashedPassword
        }
    });

    redirect(uri.toString());
}