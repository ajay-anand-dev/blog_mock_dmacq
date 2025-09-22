import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../../pages";
import { TestWrapper } from "../TestWrapper";

test("renders Home page and search input", async () => {
    render(
        <TestWrapper>
            <Home />
        </TestWrapper>
    );

    expect(screen.getByPlaceholderText("Search posts...")).toBeInTheDocument();
    expect(await screen.findByText(/Blog Posts/i)).toBeInTheDocument();
});

test("search filters posts", async () => {
    render(
        <TestWrapper>
            <Home />
        </TestWrapper>
    );

    const input = screen.getByPlaceholderText("Search posts...");
    fireEvent.change(input, { target: { value: "Blog Post 1" } });

    await waitFor(() => {
        expect(screen.getByText(/Blog Post 1/i)).toBeInTheDocument();
    });
});
