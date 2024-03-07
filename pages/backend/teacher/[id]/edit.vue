<template>
    <div class="container mx-auto py-8">
        <h2 class="text-3xl font-bold mb-8">แก้ไขข้อมูลอาจารย์</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Edit Form -->
            <div class="bg-white p-8 rounded-lg shadow-md">
                <label class="ml-1">ชื่อ-นามสกุล</label>
                <input type="text" placeholder="ชื่อ" v-model="teacher.name"
                    class="w-full border rounded-lg px-4 py-3 mb-4">
                <label class="ml-1">ตำแหน่ง</label>
                <input type="text" placeholder="ตำแหน่ง" v-model="teacher.position"
                    class="w-full border rounded-lg px-4 py-3 mb-4">
                <input type="file" accept="image/*" @change="onFileChange"
                    class="w-full relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none mb-2">

                <div class="flex flex-col space-y-4">
                    <button class="w-full bg-blue-600 text-white py-3 px-4 hover:bg-blue-700 rounded-lg"
                        @click="saveTeacher()"><i class="fas fa-save"></i> บันทึก</button>
                    <button class="w-full bg-red-600 text-white py-3 px-4 hover:bg-red-700 rounded-lg"
                        @click="confirmDelete()"><i class="fas fa-trash"></i> ลบ</button>
                </div>
            </div>

            <div class="bg-white p-8 rounded-lg shadow-md">
                <h3 class="text-xl font-semibold mb-4">ตัวอย่าง</h3>
                <div class="flex items-center justify-center">
                    <img :src="imagePreview" alt="Profile Image" class="w-64 h-64 rounded-full object-cover">
                </div>
                <div class="flex flex-col items-center justify-center">
                    <h4 class="text-lg font-semibold">{{ teacher.name }}</h4>
                    <p class="text-sm text-gray-600">{{ teacher.position }}</p>
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

const teacher = ref({
    name: '',
    position: '',
    image: null
});

const imagePreview = ref(null);

fetch(`/api/teacher/${id}`)
    .then(response => response.json())
    .then(data => {
        teacher.value.name = data.data.name;
        teacher.value.position = data.data.position;
        imagePreview.value = data.data.image;
    })
    .catch(error => {
        console.error('Error fetching teacher data:', error);
    });

function onFileChange(event) {
    // Update the teacher's image property with the selected file
    teacher.value.image = event.target.files[0];

    // Read the selected file and set it as the image preview
    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}

async function saveTeacher() {
    try {
        const formData = new FormData();
        formData.append('name', teacher.value.name);
        formData.append('position', teacher.value.position);
        if (teacher.value.image) {
            formData.append('image', teacher.value.image);
        }
        const response = await fetch(`/api/teacher/${id}/edit`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            await Toast.fire({
                icon: "success",
                title: "บันทึกข้อมูลเรียบร้อย"
            });
        } else {
            throw new Error("Failed to save teacher data");
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
        deleteTeacher();
    }
}

async function deleteTeacher() {
    try {
        const response = await fetch(`/api/teacher/${id}/delete`, {
            method: 'DELETE'
        });

        if (response.ok) {
            await Toast.fire({
                icon: "success",
                title: "ลบข้อมูลเรียบร้อย"
            });

            // Optionally, navigate to another page after deletion
            navigateTo('/backend'); // Example: Navigate back to the teachers list page
        } else {
            throw new Error("Failed to delete teacher");
        }

    } catch (error) {
        await Toast.fire({
            icon: "error",
            title: error.message || "An error occurred"
        });
    }
}
</script>