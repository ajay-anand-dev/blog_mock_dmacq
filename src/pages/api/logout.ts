import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    // Clear the cookie
    res.setHeader(
        "Set-Cookie",
        serialize("token", "", {
            httpOnly: true,
            path: "/",
            expires: new Date(0),
        })
    );

    return res.status(200).json({ message: "Logged out successfully" });
}
