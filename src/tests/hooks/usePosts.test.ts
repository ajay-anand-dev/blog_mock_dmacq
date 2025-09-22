import { renderHook, act } from "@testing-library/react";
import { usePosts, useLikePost } from "../../hooks/usePosts";
import { TestWrapper } from "../TestWrapper";

test("fetches posts and handles pagination", async () => {
    const { result, waitFor } = renderHook(() => usePosts(""), { wrapper: TestWrapper });

    await waitFor(() => !result.current.isLoading);
    expect(result.current.data?.pages[0].posts.length).toBeGreaterThan(0);

    if (result.current.hasNextPage) {
        act(() => result.current.fetchNextPage());
        await waitFor(() => !result.current.isFetchingNextPage);
        expect(result.current.data?.pages.length).toBeGreaterThan(1);
    }
});

test("likeMutation updates likes", async () => {
    const { result } = renderHook(() => useLikePost(), { wrapper: TestWrapper });

    await act(async () => {
        const post = { id: 1, title: "Test", content: "Test", likes: 0 };
        const updated = await result.current.mutateAsync(post.id);
        expect(updated.likes).toBe(post.likes + 1);
    });
});
