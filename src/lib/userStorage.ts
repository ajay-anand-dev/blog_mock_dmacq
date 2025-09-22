import fs from "fs";
import path from "path";
import { User } from "./mockDB";

const usersFile = path.join(process.cwd(), "mock-users.json");

// Read users from disk (returns empty array if no file exists)
export const readUsers = (): User[] => {
    if (!fs.existsSync(usersFile)) return [];
    return JSON.parse(fs.readFileSync(usersFile, "utf8"));
};

// Write users to disk (pretty-printed)
export const writeUsers = (users: User[]) => {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};
