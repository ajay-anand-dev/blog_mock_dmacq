import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../../pages/login";
import { TestWrapper } from "../TestWrapper";

test("login form renders and submits", async () => {
    render(
        <TestWrapper>
            <Login />
        </TestWrapper>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitBtn = screen.getByRole("button", { name: /login/i });

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "1234" } });
    fireEvent.click(submitBtn);

    // We can add expect(mocked login) here if axios is mocked
});
