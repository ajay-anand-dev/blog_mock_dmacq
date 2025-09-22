import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BlogListPage from "../../pages/blog";
import { TestWrapper } from "../TestWrapper";

test("renders posts list", async () => {
    render(
        <TestWrapper>
            <BlogListPage />
        </TestWrapper>
    );

    expect(await screen.findByText(/Blog Posts/i)).toBeInTheDocument();
});

test("like button increases likes", async () => {
    render(
        <TestWrapper>
            <BlogListPage />
        </TestWrapper>
    );

    const likeBtn = await screen.findAllByText(/❤️/i);
    fireEvent.click(likeBtn[0]);
    await waitFor(() => {
        expect(likeBtn[0].textContent).toMatch(/❤️ \d+/);
    });
});
