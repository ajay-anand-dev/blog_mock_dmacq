import { useRouter } from "next/router";
import ProtectedRoute from "@/components/ProtectedRoute";
import { usePost, useLikePost } from "@/hooks/usePosts";
import toast from "react-hot-toast";

export default function BlogDetailPage() {
    const router = useRouter();
    const { id } = router.query;
    const postId = Number(id);

    const { data: post, isLoading } = usePost(postId);
    const likeMutation = useLikePost();

    const handleLike = () => {
        if (!postId) return;
        likeMutation.mutate(postId, {
            onSuccess: () => toast.success("Liked!"),
            onError: () => toast.error("Failed to like post"),
        });
    };

    if (isLoading || !postId) {
        return (
            <ProtectedRoute>
                <div className="flex min-h-screen items-center justify-center">
                    <p className="text-lg">Loading post...</p>
                </div>
            </ProtectedRoute>
        );
    }

    if (!post) {
        return (
            <ProtectedRoute>
                <div className="flex min-h-screen items-center justify-center">
                    <p className="text-lg">Post not found.</p>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="max-w-3xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                <p className="mb-6">{post.content}</p>
                <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Likes: {post.likes}</span>
                    <button
                        onClick={handleLike}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Like
                    </button>
                </div>
            </div>
        </ProtectedRoute>
    );
}
