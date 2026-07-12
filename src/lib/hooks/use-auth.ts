import { useAuthStore } from "@/lib/store/auth-store";
export const useAuth = () => { return useAuthStore(); };