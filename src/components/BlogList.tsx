import { useQuery } from "@tanstack/react-query";
import { posts as mockPosts } from "@/lib/mockDB";
import { useState } from "react";
import BlogCard from "@/components/BlogCard";

const PER_PAGE = 5; // same as in usePosts to keep consistency

export default function BlogList() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const { data, isLoading } = useQuery({
        queryKey: ["posts", page, search],
        queryFn: async () => {
            let filtered = mockPosts;

            if (search) {
                filtered = filtered.filter((p) =>
                    p.title.toLowerCase().includes(search.toLowerCase())
                );
            }

            const start = (page - 1) * PER_PAGE;
            const end = start + PER_PAGE;

            return {
                posts: filtered.slice(start, end),
                total: filtered.length,
            };
        },
        placeholderData: (previousData) => previousData,
    });

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <input
                type="text"
                placeholder="Search posts..."
                className="border p-2 w-full mb-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {data?.posts.length ? (
                data.posts.map((post) => <BlogCard key={post.id} post={post} />)
            ) : (
                <p className="text-gray-500">No posts found.</p>
            )}

            <div className="flex justify-between mt-4">
                <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <button
                    disabled={page * PER_PAGE >= (data?.total ?? 0)}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
