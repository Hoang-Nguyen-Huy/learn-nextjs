"use server";

import { FormState } from "@/lib/definitions";
import { PrismaSingleton } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

const prisma = PrismaSingleton.getClient();

const ENDPOINT_MAIN_PAGE = "http://localhost:3000/main";

export async function login(state: FormState, formData: FormData) {
    const uri = new URL(ENDPOINT_MAIN_PAGE);

    const username = formData.get('username');
    const password = formData.get('password');

    if (typeof username !== 'string' || typeof password !== 'string') {
        return {
            errors: {
                username: ["Invalid username"],
                password: ["Invalid password"],
            }
        };
    }

    const loginUser = await prisma.user.findUnique({
        where: {
            username: username
        }
    });

    if (!loginUser) {
        return  {
            errors: {
                username: ["Username is not found"]
            }
        };
    }

    const checkPassword = await bcrypt.compare(password, loginUser.password);
    if (!checkPassword) {
        return  {
            errors: {
                password: ["Incorrect password"]
            }
        };
    }

    await createSession(loginUser.id, loginUser.username);

    redirect(uri.toString());
}
