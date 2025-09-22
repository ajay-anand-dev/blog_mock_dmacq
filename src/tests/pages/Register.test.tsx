import { render, screen, fireEvent } from "@testing-library/react";
import Register from "../../pages/register";
import { TestWrapper } from "../TestWrapper";

test("register form renders and submits", () => {
    render(
        <TestWrapper>
            <Register />
        </TestWrapper>
    );

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitBtn = screen.getByRole("button", { name: /register/i });

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "1234" } });
    fireEvent.click(submitBtn);
});
