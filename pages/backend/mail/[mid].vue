<template>
  <main class="flex min-h-screen w-full">
    <section class="container px-4 mx-auto">
      <div class="flex items-center gap-x-3">
        <h2 class="text-lg font-medium text-gray-800 "><i class="fas fa-envelope"></i>&nbsp; Mail
          Details</h2>
      </div>
      <div class="flex flex-col mt-6" v-if="mailData.code !== 'NOT_FOUND'">
        <div class="bg-white border rounded-lg overflow-hidden">
          <div class="p-6">
            <div class="flex justify-between items-center">
              <div>
                <h3 class="text-lg font-semibold text-gray-800 ">หัวข้อ : {{ mailData.data.title }}</h3>
                <p class="text-sm text-gray-500 ">จาก : {{ mailData.data.email }}</p>
              </div>
              <p class="text-sm text-gray-500">{{ mailData.data.date }}</p>
            </div>
            <hr class="my-4 border-b border-gray-200 ">
            <div class="prose " v-html="mailData.data.content"></div>
          </div>
        </div>
        <div class="mt-6 flex">
          <button @click="deleteMail(mailData.data._id)"
            class="w-6/12 px-4 py-2 text-lg font-medium text-white rounded-md bg-red-600 hover:text-white hover:bg-red-500">
            <i class="fas fa-trash"></i> ลบ
          </button>
          <a :href="`mailto:${mailData.data.email}?subject=ตอบกลับ:${mailData.data.title}`"
            class="w-6/12 ml-4 px-4 py-2 text-lg font-medium text-center text-white bg-gray-900  rounded-md hover:text-white hover:bg-gray-800">
            <i class="fas fa-reply"></i> ตอบกลับ
          </a>
        </div>
      </div>
      <div v-else class="flex justify-center items-center h-full">
        <p class="text-gray-500 ">MAIL NOT FOUND</p>
      </div>
    </section>
  </main>
</template>

<script setup>
import Swal from 'sweetalert2';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';
definePageMeta({
  layout: 'backend'
});

const route = useRoute();
const router = useRouter()
const authStore = useAuthStore()
await authStore.pretected()
if (!authStore.isLoggedIn) {
  router.push('/backend/login');
} const mailId = route.params.mid;
const { data: mailData, refresh } = await useFetch(`/api/mail/${mailId}`);

const deleteMail = async (id) => {
  Swal.fire({
    title: "ระบบ",
    text: "ต้องการลบข้อความใช่ไหม ?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ใช่",
    cancelButtonText: "ไม่"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await useFetch(`/api/mail`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
        });
        await Swal.fire({
          icon: "success",
          title: "ลบข้อความเรียบร้อย."
        });
        router.push('/backend/mail')
      } catch (error) {
        console.error('Error deleting mail:', error);
        await Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาดในการลบข้อความ"
        });
      }
    }
  });
}
</script>
