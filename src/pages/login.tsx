"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loginMutation } = useAuth();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginMutation.mutate(
            { email, password },
            {
                onSuccess: () => {
                    toast.success("Logged in successfully");
                    router.push("/");
                },
                onError: () => toast.error("Invalid credentials"),
            }
        );
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 w-full rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    Login
                </button>
            </form>

            <div className="mt-4 text-center">
                <p className="text-sm">
                    Don't have an account?{" "}
                    <button
                        onClick={() => router.push("/register")}
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Register
                    </button>
                </p>
            </div>
        </div>
    );
}
