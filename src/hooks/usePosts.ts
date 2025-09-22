import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { posts as mockPosts, Post } from "@/lib/mockDB";

export type PostsPage = {
    posts: Post[];
    total: number;
    perPage: number;
    nextPage: number;
    hasMore: boolean;
};

const PER_PAGE = 5; // you can adjust this number

// -------------------- usePosts (infinite scroll) --------------------
export function usePosts(search: string) {
    return useInfiniteQuery<PostsPage, Error>({
        queryKey: ["posts", search],
        queryFn: async ({ pageParam = 1 }) => {
            const currentPage = pageParam as number;

            // Filter + paginate in memory
            let filteredPosts = mockPosts;
            if (search) {
                filteredPosts = filteredPosts.filter((p) =>
                    p.title.toLowerCase().includes(search.toLowerCase())
                );
            }

            const start = (currentPage - 1) * PER_PAGE;
            const end = start + PER_PAGE;

            const paginatedPosts = filteredPosts.slice(start, end);

            return {
                posts: paginatedPosts,
                nextPage: currentPage + 1,
                total: filteredPosts.length,
                perPage: PER_PAGE,
                hasMore: end < filteredPosts.length,
            };
        },
        getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
        defaultPageParam: 1
    });
}

// -------------------- usePost (single post) --------------------
export function usePost(id: number) {
    return useQuery<Post>({
        queryKey: ["post", id],
        queryFn: async () => {
            const post = mockPosts.find((p) => p.id === id);
            if (!post) throw new Error("Post not found");
            return post;
        },
        enabled: !!id,
    });
}

// -------------------- useLikePost --------------------
export function useLikePost() {
    return useMutation<Post, unknown, number>({
        mutationFn: async (id: number) => {
            const post = mockPosts.find((p) => p.id === id);
            if (!post) throw new Error("Post not found");

            post.likes += 1; // ✅ directly update in-memory array
            return post;
        },
    });
}
