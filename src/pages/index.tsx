"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import LogoutButton from "@/components/LogoutButton";
import { usePosts, useLikePost } from "@/hooks/usePosts";
import toast from "react-hot-toast";

function useDebounce<T>(value: T, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

export default function Home() {
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 300);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = usePosts(debouncedSearch);
    const likeMutation = useLikePost();
    const loaderRef = useRef<HTMLDivElement | null>(null);

    const allPosts = data?.pages.flatMap((page: any) => page.posts) ?? [];

    // IntersectionObserver for infinite scroll
    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, hasNextPage]);

    useEffect(() => {
        const loaderEl = loaderRef.current;
        if (!loaderEl) return;

        const observer = new IntersectionObserver(handleObserver, { threshold: 0.1 });
        observer.observe(loaderEl);

        // trigger fetch if loader is already visible
        const rect = loaderEl.getBoundingClientRect();
        if (rect.top <= window.innerHeight && hasNextPage) {
            fetchNextPage();
        }

        return () => observer.disconnect();
    }, [allPosts.length, handleObserver, hasNextPage, fetchNextPage]);

    // if (isLoading) return <p>Loading...</p>;
    // if (isError) return <p className="text-red-500">Error: {error?.message}</p>;

    return (
        <ProtectedRoute>
            <div className="max-w-2xl mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Blog Posts</h1>
                    <LogoutButton />
                </div>

                <input
                    type="text"
                    placeholder="Search posts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border p-2 rounded mb-4"
                />

                {isLoading ? <p>Loading...</p> : null}
                {isError ? <p className="text-red-500">Error: {error?.message}</p> : null}

                <div className="grid gap-4">
                    {allPosts.map(post => (
                        <div key={post.id} className="border p-4 mb-3 rounded shadow">
                            <h2 className="font-bold text-xl">{post.title}</h2>
                            <p className="whitespace-pre-line">{post.content}</p>
                            <button
                                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
                                onClick={() =>
                                    likeMutation.mutate(post.id, {
                                        onSuccess: () => toast.success("Liked!"),
                                    })
                                }
                            >
                                ❤️ {post.likes}
                            </button>
                        </div>
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
