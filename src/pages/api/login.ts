// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { readUsers } from "@/lib/userStorage";
import { decryptPassword } from "@/hooks/useEncryption";
import { serialize } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { email, password } = req.body;
    const users = readUsers();

    const user = users.find((u: any) => u.email === email);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const decryptedPassword = decryptPassword(user.password);
    if (decryptedPassword !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = `mock-token-${email}`;
    res.setHeader(
        "Set-Cookie",
        serialize("token", token, { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 })
    );

    return res.status(200).json({ token, user: { email } });
}
