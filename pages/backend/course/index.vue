<template>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 space-x-2">
        <div v-for="(item, key) in courses" :key="key" @click="edit(item._id)"
            class="bg-white rounded-md p-8 flex justify-center items-center border-2 hover:border-blue-400 cursor-pointer hover:text-blue-600">
            <span class="font-bold text-2xl">{{ item.title }}</span><br>
            <!-- <span class="text-gray-700">{{ item.description }}</span> -->
            <!-- {{ item }} -->
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';


definePageMeta({
    layout: 'backend'
});

const edit = (id) => {
    navigateTo(`/backend/course/${id}/edit`)
}

const courses = ref([]);

const { data: courseData, refresh: courseRefresh } = await useFetch('/api/course');

courses.value = courseData.value.data
// const data = await response.json();
// if (data.code === 'SUCCESS') {
//     courses.value = [data.data];
// } else {
//     console.error('Failed to fetch courses:', data.message);
// }

</script>
