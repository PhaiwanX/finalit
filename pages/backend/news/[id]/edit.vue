<template>
    <div>
        <h2 class="text-xl font-bold mb-5">แก้ไขข้อมูลข่าว</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Edit Form -->
            <div class="bg-white p-5 rounded border shadow-md">
                <input type="text" placeholder="ชื่อ" v-model="news.title" class="w-full border rounded px-3 py-2 mb-2">
                <input type="text" placeholder="ตำแหน่ง" v-model="news.content"
                    class="w-full border rounded px-3 py-2 mb-2">
                <input type="file" accept="image/*" @change="onFileChange" class="mb-2">
                <button class="px-3 py-2 w-full bg-blue-600 text-white my-3 hover:bg-blue-700 rounded-md"
                    @click="savenews()">SAVE</button>
                <button class="px-3 py-2 w-full bg-red-600 text-white my-3 hover:bg-red-700 rounded-md"
                    @click="confirmDelete()">DELETE</button> <!-- Add delete button -->
            </div>

            <!-- Preview Section -->
            <div class="bg-white p-5 rounded border shadow-md">
                <h2 class="text-xl font-bold mb-5">ตัวอย่างข่าว</h2>
                <div class="grid grid-cols-1 gap-5">
                    <div class="flex items-center justify-center">
                        <img :src="previewImage" alt="Profile Image" class="w-full rounded-md object-cover">
                    </div>
                    <div class="rounded">
                        <h3 class="text-lg font-semibold mb-3">{{ news.title }}</h3>
                        <p class="text-sm">{{ news.content }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/store/auth';
import Swal from 'sweetalert2';
import { ref } from 'vue';
const route = useRoute();
const router = useRouter()
const authStore = useAuthStore()

await authStore.pretected()
if (!authStore.isLoggedIn) {
    router.push('/backend/login');
}

definePageMeta({
    layout: 'backend'
});
const id = route.params.id;

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

const news = ref({
    title: '',
    content: '',
    image: null // Add image property to store the selected image
});
const previewImage = ref(null)

fetch(`/api/news/${id}`)
    .then(response => response.json())
    .then(data => {
        news.value.title = data.data.title;
        news.value.content = data.data.content;
        previewImage.value = data.data.image;
    })
    .catch(error => {
        console.error('Error fetching news data:', error);
    });

function onFileChange(event) {
    news.value.image = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.value = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);

}

async function savenews() {
    try {
        const formData = new FormData();
        formData.append('title', news.value.title);
        formData.append('content', news.value.content);
        if (news.value.image) {
            formData.append('image', news.value.image);
        }
        const response = await fetch(`/api/news/${id}/edit`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            await Toast.fire({
                icon: "success",
                title: "บันทึกข้อมูลเรียบร้อย"
            });
        } else {
            throw new Error("Failed to save news data");
        }

    } catch (error) {
        await Toast.fire({
            icon: "error",
            title: error.message || "An error occurred"
        });
    }
}

async function confirmDelete() {
    const confirmResult = await Swal.fire({
        title: 'ระบบ',
        text: 'แน่ใจไหมว่าต้องการลบ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่ใช่'
    });

    if (confirmResult.isConfirmed) {
        deletenews();
    }
}

async function deletenews() {
    try {
        const response = await fetch(`/api/news/${id}/delete`, {
            method: 'DELETE'
        });

        if (response.ok) {
            await Toast.fire({
                icon: "success",
                title: "ลบข้อมูลเรียบร้อย"
            });

            // Optionally, navigate to another page after deletion
            navigateTo('/backend/news'); // Example: Navigate back to the news list page
        } else {
            throw new Error("Failed to delete news");
        }

    } catch (error) {
        await Toast.fire({
            icon: "error",
            title: error.message || "An error occurred"
        });
    }
}
</script>
