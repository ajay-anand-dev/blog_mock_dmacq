"use client";
import { useRouter } from "next/router";
import { usePost, useLikePost } from "@/hooks/usePosts";
import ProtectedRoute from "@/components/ProtectedRoute";
import toast from "react-hot-toast";

export default function PostDetail() {
    const router = useRouter();
    const id = Number(router.query.id);
    const { data: post, isLoading } = usePost(id);
    const likeMutation = useLikePost();

    if (isLoading) return <p>Loading...</p>;
    if (!post) return <p>Post not found</p>;

    return (
        <ProtectedRoute>
            <div className="max-w-2xl mx-auto p-4">
                <h1 className="text-2xl font-bold">{post.title}</h1>
                <p className="my-4">{post.content}</p>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() =>
                        likeMutation.mutate(post.id, { onSuccess: () => toast.success("Liked!") })
                    }
                >
                    ❤️ {post.likes}
                </button>
            </div>
        </ProtectedRoute>
    );
}
