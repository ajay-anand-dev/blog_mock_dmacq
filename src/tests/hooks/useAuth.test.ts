import { renderHook, act } from "@testing-library/react";
import { useAuth } from "../../hooks/useAuth";
import { TestWrapper } from "../TestWrapper";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

test("loginMutation works", async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { token: "mock-token" } });
    const { result } = renderHook(() => useAuth(), { wrapper: TestWrapper });

    await act(async () => {
        const data = await result.current.loginMutation.mutateAsync({ email: "a@b.com", password: "123" });
        expect(data.token).toBe("mock-token");
    });
});
