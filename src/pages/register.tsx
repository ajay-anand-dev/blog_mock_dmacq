"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { registerMutation } = useAuth();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        registerMutation.mutate(
            { email, password },
            {
                onSuccess: () => {
                    toast.success("Registered successfully, please login");
                    router.push("/login");
                },
                onError: (err: any) => toast.error(err.response?.data?.message || "Registration failed"),
            }
        );
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
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
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                    Register
                </button>
            </form>

            <div className="mt-4 text-center">
                <p className="text-sm">
                    Already have an account?{" "}
                    <button
                        onClick={() => router.push("/login")}
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
}
