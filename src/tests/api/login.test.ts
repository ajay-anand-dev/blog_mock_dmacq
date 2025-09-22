import { createMocks } from "node-mocks-http";
import loginHandler from "../../pages/api/login";
import { writeUsers } from "../../lib/userStorage";
import { encryptPassword } from "../../hooks/useEncryption";

beforeAll(() => {
    // Pre-create a test user with encrypted password
    const encryptedPassword = encryptPassword("1234");
    writeUsers([{ email: "test@test.com", password: encryptedPassword }]);
});

test("POST /api/login with valid credentials returns a token", async () => {
    const { req, res } = createMocks({
        method: "POST",
        body: { email: "test@test.com", password: "1234" },
    });

    await loginHandler(req, res);

    expect(res._getStatusCode()).toBe(200);

    const data = JSON.parse(res._getData());

    // ✅ Ensure token is returned and matches format
    expect(data.token).toBeDefined();
    expect(data.token).toContain("mock-token-");
    expect(data.token).toContain("test@test.com");
});
