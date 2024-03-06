<template>
    <section>
        <!-- <toast message="Test Krub" status="error"/> -->
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto my-5 lg:py-0">
            <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <form @submit.prevent="login">
                        <h1 class="text-xl font-bold leading-tight tracking-tight my-3 text-gray-900 md:text-2xl ">
                            Login to your account
                        </h1>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your
                                email</label>
                            <input type="email" v-model="users.email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                                placeholder="Email address" required>
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                            <input type="password" v-model="users.password" placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                                required>
                        </div>
                        <div class="flex items-center my-2 justify-between">
                            <div class="flex items-start">
                            </div>
                            <nuxt-link to="/reset-password"
                                class="text-sm font-medium text-blue-600 hover:underline ">Forgot
                                password?</nuxt-link>
                        </div>
                        <button type="submit"
                            class="w-full my-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Login</button>
                        <p class="text-sm font-light text-gray-500 ">
                            Don’t have an account yet? <nuxt-link to="/register"
                                class="font-medium text-blue-600 hover:underline">Register</nuxt-link>
                        </p>

                    </form>
                </div>
            </div>
        </div>

    </section>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
const router = useRouter()
const authStore = useAuthStore()

if (authStore.isLoggedIn) {
    router.push('/');
}
const users = ref({
    email: "",
    password: ""
})

const login = async () => {
    await authStore.login(users.value)
    if (authStore.isLoggedIn) {
        router.push("/")
    }
}
</script>