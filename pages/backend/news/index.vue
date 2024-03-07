<template>
    <div>
        <div class="grid grid-cols-4 gap-4">
            <div v-for="(item, key) in newsData.data" :key="key" @click="edit(item._id)"
                class="bg-white rounded-md border-2 p-5 hover:border-blue-400 cursor-pointer">
                <img :src="item.image" class="w-full rounded-md"><br>
                <span class="my-1 text-xl font-blod">{{ item.title }}</span> <br>
                <span class="text-gray-500">{{ item.content }}</span>
            </div>
            <div @click="addNews()"
                class="bg-white justify-center items-center flex rounded-md border-2 p-5 hover:border-blue-400 cursor-pointer">
                <i class="fas fa-plus text-5xl">
                </i>
            </div>

        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/store/auth';
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});
const router = useRouter()
const authStore = useAuthStore()
await authStore.pretected()
if (!authStore.isLoggedIn) {
    router.push('/backend/login');
}
definePageMeta({
    layout: 'backend'
});

const { data: newsData, refresh: refreshNews } = await useFetch('/api/news');

const edit = async (id) => {
    navigateTo(`/backend/news/${id}/edit`);
}
async function addNews() {
    try {
        const response = await fetch('/api/news/add');

        if (response.ok) {
            const data = await response.json();
            const newsID = data.data._id;
            navigateTo(`/backend/news/${newsID}/edit`);

        } else {
            throw new Error('Failed to add teacher');
        }
    } catch (error) {
        console.error('Error adding teacher:', error);
    }
}


</script>
