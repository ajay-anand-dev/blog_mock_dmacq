import { createMocks } from "node-mocks-http";
import handler from "../../pages/api/posts";
import { writeUsers } from "../../lib/userStorage";
import { encryptPassword } from "@/hooks/useEncryption";

// Helper to register a user before fetching posts
beforeAll(() => {
    // Save a user to match token
    writeUsers([{ email: "test@test.com", password: encryptPassword("1234") }]);
});

test("GET /api/posts returns posts with valid token", async () => {
    const validToken = "mock-token-test@test.com"; // token must match registered email
    const { req, res } = createMocks({
        method: "GET",
        cookies: { token: validToken },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.posts.length).toBeGreaterThan(0);
    expect(data.total).toBeGreaterThan(0);
});
