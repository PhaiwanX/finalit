<template>
  <main class="flex min-h-screen w-full">
    <section class="container px-4 mx-auto">
      <div class="flex items-center gap-x-3">
        <h2 class="text-lg font-medium text-gray-800 dark:text-white"><i class="fas fa-envelope"></i>&nbsp; INBOX
        </h2>
      </div>
      <div class="flex flex-col mt-6">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col"
                      class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <div class="flex items-center gap-x-3">
                        <span>Title</span>
                      </div>
                    </th>

                    <th scope="col"
                      class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <div class="flex items-center gap-x-2">
                        <span>Status</span>
                      </div>
                    </th>

                    <th scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Email address</th>

                    <th scope="col"
                      class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      Date</th>

                    <th scope="col" class="relative py-3.5 px-4">
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">

                  <tr v-for="(mail, key) in mailsData.data" :key="key" class="hover:bg-gray-50 cursor-pointer"
                    @click="router.push(`/backend/mail/${mail._id}`)">
                    <td class="px-4 py-4 text-sm text-black font-bold dark:text-gray-300 whitespace-nowrap">
                      {{ mail.title }}
                    </td>

                    <td class="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                      <div :class="[
                    'inline-flex items-center px-3 py-1 rounded-full gap-x-2',
                    mail.status === 'New' ? 'bg-emerald-100/60 dark:bg-gray-800' : 'bg-blue-100/60 dark:bg-gray-800'
                  ]">
                        <span class="h-1.5 w-1.5 rounded-full"
                          :class="mail.status === 'New' ? 'bg-emerald-500' : 'bg-blue-500'"></span>

                        <h2 class="text-sm font-normal"
                          :class="mail.status === 'New' ? 'text-emerald-500' : 'text-blue-500'">{{ mail.status }}</h2>
                      </div>
                    </td>
                    <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                      {{ mail.email }}</td>
                    <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{{ mail.date }}
                    </td>
                    <td class="px-4 py-4 text-sm whitespace-nowrap">
                      <div class="flex items-center gap-x-6">
                        <button @click.stop="deleteMail(mail._id)"
                          class="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </section>
  </main>
</template>
<script setup>
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth';

const router = useRouter()
const authStore = useAuthStore()
await authStore.pretected()
if (!authStore.isLoggedIn) {
  router.push('/backend/login');
}
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


definePageMeta({
  layout: 'backend'
})

const { data: mailsData, refresh } = await useFetch('/api/mail');

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
        const delMail = await useFetch(`/api/mail`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
        });
        refresh()
        await Toast.fire({
          icon: "success",
          title: "ลบข้อความเรียบร้อย."
        });
      } catch (error) {
        console.error('Error deleting mail:', error);
      }

    }
  });

}
</script>
