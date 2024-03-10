<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 px-5 w-full">

        <div class="bg-white rounded-md p-8 border-2 shadow-md">
            <h2 class="font-bold text-2xl mb-4">แก้ไขข้อมูลหลักสูตร</h2>
            <form @submit.prevent="submitForm">
                <div class="mb-6">
                    <label for="title" class="block text-gray-700 font-bold mb-2">สาขาวิชา</label>
                    <input type="text" v-model="form.title" id="title" name="title" placeholder="Enter title..."
                        class="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:border-blue-500">
                </div>
                <div class="mb-6">
                    <label for="description" class="block text-gray-700 font-bold mb-2">ข้อมูล</label>
                    <textarea v-model="form.description" id="description" name="description"
                        placeholder="Enter description..."
                        class="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:border-blue-500"></textarea>
                </div>
                <button type="submit"
                    class="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-300">Save</button>
            </form>
        </div>
        <div>
            <!-- nothing -->
            <div class="grid grid-cols-1 md:grid-cols-3">
                <div @click="showCard(term.no)" v-for="(term, key) in courseData.data.term"
                    class="flex justify-center m-1 cursor-pointer bg-white rounded-xl p-5 border-2 shadow-sm hover:shadow-md hover:border-blue-300">
                    {{ term.title }}
                </div>
            </div>

            <TermManager v-if="cardData.show" :courseData="cardData.data" :id="id" :term="cardData.term" />
            <!-- {{ cardData }} -->
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import TermManager from '~/components/TermManager.vue';
const route = useRoute();
const id = route.params.id;
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

definePageMeta({
    layout: 'backend'
});

const form = ref({
    title: '',
    description: ''
});

const cardData = ref({
    show: false,
    data: [],
    term: null
})
const showCard = async (no) => {
    const { data: termData, refresh: termRefresh } = await useFetch(`/api/course/${id}/${no}`)
    cardData.value = {
        show: true,
        data: termData.value.data,
        term: no
    }
}


const { data: courseData, refresh: courseDataRefresh } = await useFetch(`/api/course/${id}`)
form.value = courseData.value.data

const submitForm = () => {
    fetch(`/api/course/${route.params.id}/edit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form.value)
    })
        .then(response => {
            if (response.ok) {
                // Handle successful response
                Toast.fire({
                    icon: 'success',
                    text: 'บันทึกข้อมูลเรียบร้อย'
                })
            } else {
                // Handle error response
                console.error('Failed to save data.');
            }
        })
        .catch(error => {
            // Handle network errors
            console.error('Network error:', error);
        });

    console.log('Form submitted:', form.value);
};

</script>
