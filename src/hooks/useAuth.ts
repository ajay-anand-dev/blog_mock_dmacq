import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";

export function useAuth() {
    const queryClient = useQueryClient();
    const router = useRouter();

    const loginMutation = useMutation({
        mutationFn: async (data: { email: string; password: string }) => {
            const res = await axios.post("/login", data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["auth"] });
            router.push("/");
        },
    });

    const registerMutation = useMutation({
        mutationFn: async (data: { email: string; password: string }) => {
            const res = await axios.post("/register", data);
            return res.data;
        },
        onSuccess: () => {
            router.push("/login");
        },
    });

    const logoutMutation = useMutation({
        mutationFn: async () => {
            await axios.post("/logout");
        },
        onSuccess: () => {
            queryClient.clear();
            router.push("/login");
        },
    });

    const authQuery = useQuery({
        queryKey: ["auth"],
        queryFn: async () => {
            const res = await axios.get("/auth-check");
            return res.data.authenticated;
        },
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });

    return { loginMutation, registerMutation, logoutMutation, authQuery };
}
