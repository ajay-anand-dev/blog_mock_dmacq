import Link from "next/link";
import { Post } from "@/lib/mockDB";

type BlogCardProps = {
    post: Post;
    onLike?: () => void; // optional callback for like
};

export default function BlogCard({ post, onLike }: BlogCardProps) {
    return (
        <div className="p-4 border rounded shadow-sm bg-white">
            <Link href={`/blog/${post.id}`}>
                <h2 className="text-xl font-bold">{post.title}</h2>
            </Link>
            <p>{post.content.slice(0, 100)}...</p>
            <div className="flex justify-between items-center mt-2">
                <span>Likes: {post.likes}</span>
                <button
                    onClick={onLike}
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                    Like
                </button>
            </div>
        </div>
    );
}
