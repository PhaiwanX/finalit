<template>
    <div class="flex w-screen h-screen space-x-6 bg-gray-100">
        <div class="flex flex-col items-center w-60 h-full overflow-hidden text-gray-400 bg-gray-900 rounded">
            <div class="w-full px-2">
                <div class="flex flex-col items-center w-full mt-3r">
                    <nuxt-link v-for="(item, index) in sideItems" :key="index" :to="item.link"
                        class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
                        <i :class="item.icon"></i>
                        <span class="ml-2 font-medium">{{ item.text }}</span>
                    </nuxt-link>
                    <nuxt-link to="/"
                        class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
                        <i class="fas fa-arrow-up-right-from-square"></i>
                        <span class="ml-2 font-medium">ไปที่เว็บไซต์</span>
                    </nuxt-link>
                </div>
            </div>
            <a class="cursor-pointer flex items-center justify-center w-full h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300"
                @click="logout">
                <span class="ml-2 text-sm font-medium">{{ name }} &nbsp;</span>
                <i class="fas fa-sign-out-alt"></i>

            </a>
        </div>
        <div class="my-3 w-full overflow-auto	">
            <NuxtPage />
        </div>
    </div>
</template>

<script setup>

import { useAuthStore } from '@/store/auth';
const router = useRouter()
const authStore = useAuthStore()
const name = ref(null)
await authStore.pretected()
if (authStore.isLoggedIn) {
    name.value = authStore.user.name
}
const logout = async () => {
    await authStore.logout(router)

}
const sideItems = [
    {
        text: 'จัดการข้อมูลเว็บ',
        icon: 'fas fa-cogs',
        link: '/backend/'
    },
    {
        text: 'จัดการข่าว',
        icon: 'fas fa-newspaper',
        link: '/backend/news'
    },
    {
        text: 'จัดการหลักสูตร',
        icon: 'fas fa-graduation-cap',
        link: '/backend/course'
    },
]

</script>