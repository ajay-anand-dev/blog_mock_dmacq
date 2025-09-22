import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = req.cookies.token;

    if (token) return res.status(200).json({ authenticated: true });
    return res.status(401).json({ authenticated: false });
}
