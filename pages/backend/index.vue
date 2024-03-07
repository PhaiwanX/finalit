<template>
    <div class="container mx-auto py-8">
        <h2 class="text-3xl font-bold mb-8">จัดการข้อมูลเว็บ</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Edit Banner Section -->
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold mb-4">แก้ไข Banner</h3>
                <div class="mb-4">
                    <img :src="heroData.data[0].image" class="w-full rounded-lg mb-4" />
                    <input type="file" accept="image/*" class="w-full border rounded-lg py-2 px-4"
                        @change="onFileChange">
                </div>
                <input type="text" placeholder="Title" v-model="banner.title"
                    class="w-full border rounded-lg py-2 px-4 mb-4">
                <input type="text" placeholder="Description" v-model="banner.description"
                    class="w-full border rounded-lg py-2 px-4 mb-4">
                <button class="w-full bg-blue-600 text-white py-2 px-4 hover:bg-blue-700 rounded-lg"
                    @click="saveBanner()">SAVE</button>
            </div>

            <!-- Edit About Us Section -->
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-lg font-semibold mb-4">แก้ไข เกี่ยวกับเรา</h3>
                <textarea placeholder="ข้อความ" v-model="aboutUsText"
                    class="w-full border rounded-lg py-2 px-4 h-48 mb-4"></textarea>
                <button @click="saveAbout()"
                    class="w-full bg-blue-600 text-white py-2 px-4 hover:bg-blue-700 rounded-lg">SAVE</button>
            </div>
        </div>

        <h3 class="text-2xl font-semibold my-8">แก้ไขรายชื่อ อาจารย์</h3>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div v-for="teacher in teachers" :key="teacher.id" @click="goToTeacherEditPage(teacher._id)"
                class="bg-white cursor-pointer rounded-lg shadow-md flex flex-col items-center justify-center p-6 hover:shadow-xl transition duration-300">
                <img :src="teacher.image" alt="Teacher Image" class="rounded-full w-24 h-24 mb-2 object-cover">
                <span class="font-semibold">{{ teacher.name }}</span>
                <span class="text-sm">{{ teacher.position }}</span>
            </div>
            <div @click="addTeacher()"
                class="bg-white cursor-pointer rounded-lg shadow-md flex items-center justify-center p-6 hover:shadow-xl transition duration-300">
                <i class="fas fa-plus text-4xl text-blue-600"></i>
            </div>
        </div>
    </div>
</template>


<script setup>
import Swal from 'sweetalert2';
import { ref } from 'vue';

import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
await authStore.pretected()
if (!authStore.isLoggedIn) {
    router.push('/backend/login');
}
definePageMeta({
    layout: 'backend'
});

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

const banner = ref({
    title: '',
    description: '',
    image: ''
})
const { data: heroData, refresh: heroRefresh } = await useFetch("/api/hero");
banner.value = {
    title: heroData?.value.data[0].title,
    description: heroData?.value.data[0].description
}
const { data: aboutData, refresh: aboutRefresh } = await useFetch("/api/about");
const aboutUsText = ref(aboutData?.value.data.content);

const { data: teacherData } = await useFetch('/api/teacher');
const teachers = teacherData?.value.data

function onFileChange(event) {
    const file = event.target.files[0];
    banner.value.image = file;
}

async function saveBanner() {
    try {
        const formData = new FormData();
        formData.append('title', banner.value.title);
        formData.append('description', banner.value.description);
        formData.append('image', banner.value.image);

        const response = await fetch(`/api/hero/${heroData?.value.data[0]._id}/edit`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            heroRefresh();
            await Toast.fire({
                icon: "success",
                title: "บันทึกข้อมูลเรียบร้อย"
            });
        } else {
            await Toast.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด"
            });
        }
    } catch (error) {
        await Toast.fire({
            icon: "error",
            title: error

        });
    }
}

async function saveAbout() {
    try {
        const response = await fetch(`/api/about`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: aboutData?.value.data._id.toString(),
                content: aboutUsText.value.toString()
            })
        });
        if (response.ok) {
            aboutRefresh();
            await Toast.fire({
                icon: "success",
                title: "บันทึกข้อมูลเรียบร้อย"
            });
        } else {
            throw new Error("Failed to save about data");
        }

    } catch (error) {
        await Toast.fire({
            icon: "error",
            title: error.message || "An error occurred"
        });
    }
}
async function addTeacher() {
    try {
        // Assuming you have access to the name and position of the new teacher
        const response = await fetch('/api/teacher/add');

        if (response.ok) {
            const data = await response.json();
            const newTeacherId = data.data._id; // Assuming the server returns the newly added teacher's ID

            // Navigate to the edit page of the newly added teacher
            navigateTo(`/backend/teacher/${newTeacherId}/edit`);
        } else {
            throw new Error('Failed to add teacher');
        }
    } catch (error) {
        console.error('Error adding teacher:', error);
        // Handle error (e.g., show a notification to the user)
    }
}

function goToTeacherEditPage(teacherId) {
    navigateTo(`/backend/teacher/${teacherId}/edit`);
}
</script>