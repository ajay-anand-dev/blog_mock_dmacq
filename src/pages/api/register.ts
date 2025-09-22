// pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { readUsers, writeUsers } from "@/lib/userStorage";
import { encryptPassword } from "@/hooks/useEncryption";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    const users = readUsers();
    if (users.find((u: any) => u.email === email)) {
        return res.status(409).json({ message: "User already exists" });
    }

    const encryptedPassword = encryptPassword(password);
    const newUsers = [...users, { email, password: encryptedPassword }];
    writeUsers(newUsers);

    return res.status(201).json({ message: "User registered successfully" });
}
