// hooks/useEncryption.ts
import crypto from "crypto";

const KEY = "dM@cQ-bL0G-!12345678901234567890"; // ✅ exactly 32 chars
const ALGORITHM = "aes-256-cbc";

export function encryptPassword(password: string) {
    const iv = crypto.randomBytes(16); // AES CBC needs 16-byte IV
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(KEY), iv);
    let encrypted = cipher.update(password, "utf8", "hex");
    encrypted += cipher.final("hex");
    return iv.toString("hex") + ":" + encrypted; // store IV with encrypted data
}

export function decryptPassword(encrypted: string) {
    const [ivHex, encryptedData] = encrypted.split(":");
    if (!ivHex || !encryptedData) throw new Error("Invalid encrypted data format");

    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(KEY), iv);
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}
