import { storeToRefs } from 'pinia';
import { useAuthStore } from "@/store/auth";

export default defineNuxtRouteMiddleware(async () => {
    // check if user is authenticated by using cookie and pinia

    const session = useCookie('token').value || null
    const authStore = useAuthStore();

    await authStore.pretected();

})
