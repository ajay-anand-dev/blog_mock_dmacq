import type { NextApiRequest, NextApiResponse } from "next";
import { posts } from "@/lib/mockDB";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = req.cookies.token;
    if (!token)
        return res.status(401).json({ message: "Unauthorized" });
    if (req.method === "GET") {
        let page = 1;
        let search = ''
        const perPage = 10;
        if (req.query) {
            page = parseInt((req.query.page as string) || "1", 10);
            search = (req.query.search as string)?.toLowerCase() || "";
        }
        const filteredPosts = search ? posts.filter((p) => p.title.toLowerCase().includes(search)) : posts;
        const start = (page - 1) * perPage;
        const paginated = filteredPosts.slice(start, start + perPage);
        return res.status(200).json({ posts: paginated, total: filteredPosts.length, page, perPage, });
    }

    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}