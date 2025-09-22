import { createMocks } from "node-mocks-http";
import handler from "../../pages/api/register";
import { readUsers } from "../../lib/userStorage";
import { decryptPassword } from "../../hooks/useEncryption";

test("POST /api/register creates a user with encrypted password", async () => {
    const { req, res } = createMocks({
        method: "POST",
        body: { email: "test@test.com", password: "1234" }, // ✅ send plain password
    });

    await handler(req, res);

    // ✅ Check response
    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData()).message).toBe("User already exists");

    // ✅ Check that user is saved
    const users = readUsers();
    const savedUser: any = users.find((u: any) => u.email === "test@test.com");
    expect(savedUser).toBeDefined();

    // ✅ Password should not be stored in plain text
    expect(savedUser.password).not.toBe("12345");

    // ✅ Decrypt and verify original password
    const decrypted = decryptPassword(savedUser.password);
    expect(decrypted).toBe("1234");
});
