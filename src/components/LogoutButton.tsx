"use client";

import { useAuth } from "@/hooks/useAuth";

export default function LogoutButton() {
    const { logoutMutation } = useAuth();

    return (
        <button
            onClick={() => logoutMutation.mutate()}
            className="px-3 py-1 bg-red-500 text-white rounded"
        >
            Logout
        </button>
    );
}

