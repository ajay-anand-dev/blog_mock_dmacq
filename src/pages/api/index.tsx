import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const apiRoutes = [
        { method: "POST", path: "/api/register", description: "Register a new user" },
        { method: "POST", path: "/api/login", description: "Login a user" },
        { method: "POST", path: "/api/logout", description: "Logout a user" },
        { method: "GET", path: "/api/auth-check", description: "Check if user is authenticated" },
        { method: "GET", path: "/api/posts", description: "Get paginated posts" },
        { method: "POST", path: "/api/posts/:id/like", description: "Like a post" },
    ];

    res.status(200).json(apiRoutes);
}
