<template>
    <section class="mt-8">
        <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-black">ติดต่อเรา</h2>

            <div class="w-full bg-white border border-gray-200 rounded-lg shadow">
                <dl class="grid max-w-screen-xl grid-cols-3 gap-8 p-4 mx-auto text-black">
                    <nuxt-link class="flex flex-col items-center justify-center" to="tel:0933988218">
                        <dt class="mb-2 text-3xl font-extrabold"><i class="fas fa-mobile-screen"></i></dt>
                        <dd class="text-gray-500">093 398 8218 <br> 099 261 8080</dd>
                    </nuxt-link>
                    <nuxt-link class="flex flex-col items-center justify-center" to="mailto:itctc@ccollege.ca.th">
                        <dt class="mb-2 text-3xl font-extrabold"><i class="fas fa-envelope"></i></dt>
                        <dd class="text-gray-500">itctc@ccollege.ca.th</dd>
                    </nuxt-link>
                    <nuxt-link class="flex flex-col items-center justify-center"
                        to="https://maps.app.goo.gl/8R8C8cSod6tTBNDv5" target="_blank">
                        <dt class="mb-2 text-3xl font-extrabold"><i class="fas fa-location-dot"></i></dt>
                        <dd class="text-gray-500">260 แผนกเทคโนโลยีสารสนเทศ วิทยาลัยเทคนิคชัยภูมิ
                            ต.ในเมือง อ.เมือง จ.ชัยภูมิ 36000</dd>
                    </nuxt-link>
                </dl>

            </div>

            <hr class="my-3">

            <form @submit.prevent="sendMail" class="space-y-8">
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-black">
                        อีเมล
                    </label>
                    <input type="email" id="email" v-model="mail.email"
                        class="shadow-sm bg-white border border-gray-300 text-black text-sm rounded-lg focus:ring-amber-900/50 focus:border-amber-900/50 block w-full p-2.5 "
                        placeholder="xxxxxx@ccollege.ac.th" required>
                </div>
                <div>
                    <label for="subject" class="block mb-2 text-sm font-medium text-black">หัวข้อ</label>
                    <input type="text" id="subject" v-model="mail.title"
                        class="block p-3 w-full text-sm text-black bg-white rounded-lg border border-gray-300 shadow-sm focus:ring-amber-900/50 focus:border-amber-900/50 "
                        placeholder="หัวข้อที่ต้องการจะติดต่อ" required>
                </div>
                <div class="sm:col-span-2">
                    <label for="message" class="block mb-2 text-sm font-medium text-black">เนื้อหา</label>
                    <textarea id="message" rows="6" v-model="mail.content"
                        class="block p-2.5 w-full text-sm text-black bg-white rounded-lg shadow-sm border border-gray-300 focus:ring-amber-900/50 focus:border-amber-900/50 "
                        placeholder="เนื้อหาของเรื่องที่จะติดต่อ"></textarea>
                </div>
                <button type="submit"
                    class="w-full py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-black sm:w-fit hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-amber-900/50 ">ส่งข้อความ</button>
            </form>
        </div>
    </section>
</template>

<script setup>
import Swal from 'sweetalert2';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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

const router = useRouter();

const mail = ref({
    title: "",
    email: "",
    content: ""
});

const sendMail = async () => {
    try {
        const { data: send, refresh } = await useFetch('/api/mail', {
            method: 'POST',
            body: mail.value
        });
        await Toast.fire({
            icon: "success",
            title: 'ส่งข้อความสำเร็จแล้ว'
        });

    } catch (error) {
        console.error("Error sending mail:", error);
        await Toast.fire({
            icon: "error",
            title: "Failed to send email. Please try again later."
        });
    }
};
</script>
