"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { usePosts, useLikePost } from "@/hooks/usePosts";
import { useState, useRef, useEffect } from "react";
import BlogCard from "@/components/BlogCard";
import toast from "react-hot-toast";
import { Post } from "@/lib/mockDB";

export default function BlogListPage() {
    const [search, setSearch] = useState("");
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = usePosts(search);
    const likeMutation = useLikePost();
    const loaderRef = useRef<HTMLDivElement | null>(null);

    // Flatten all pages into one array
    const allPosts = data?.pages.flatMap((page: any) => page.posts) ?? [];

    // Infinite scroll
    useEffect(() => {
        if (!loaderRef.current || !hasNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            {
                threshold: 0.1, // Trigger when 10% of loader is visible
            }
        );

        observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [hasNextPage, fetchNextPage]);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p className="text-red-500">Error: {error?.message}</p>;

    return (
        <ProtectedRoute>
            <div className="p-6 max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>

                <input
                    type="text"
                    placeholder="Search posts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border p-2 rounded mb-4"
                />

                <div className="grid gap-4">
                    {allPosts.map((post: Post) => (
                        <BlogCard
                            key={post.id}
                            post={post}
                            onLike={() =>
                                likeMutation.mutate(post.id, {
                                    onSuccess: () => toast.success("Liked!"),
                                    onError: () => toast.error("Failed to like"),
                                })
                            }
                        />
                    ))}
                </div>

                <div ref={loaderRef} className="text-center py-4">
                    {isFetchingNextPage
                        ? "Loading more..."
                        : hasNextPage
                            ? "Scroll to load more"
                            : "End of posts"}
                </div>
            </div>
        </ProtectedRoute>
    );
}
