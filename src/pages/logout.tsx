import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function LogoutButton() {
    const { logoutMutation } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                toast.success("Logged out successfully");
                router.push("/login");
            },
        });
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
            Logout
        </button>
    );
}
