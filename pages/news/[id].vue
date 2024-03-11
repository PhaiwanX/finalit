<template>
    <div class="container mx-auto py-8">
        <div class="max-w-4xl mx-auto">
            <div v-if="data" class="bg-white shadow-md rounded-lg p-8">
                <h1 class="text-3xl font-bold mb-4">{{ data.title }}</h1>
                <img :src="data.image" alt="News Image" class="w-full h-auto rounded-md mb-4">
                <p class="text-gray-700">{{ data.content }}</p>
            </div>
            <div v-else class="text-center">Loading...</div>
            <button @click="$router.back()"
                class="bg-gray-900 hover:bg-gray-800 text-white my-3 rounded-lg px-4 py-2 w-full">กลับ</button>
        </div>
    </div>
</template>


<script setup lang="ts">
const route = useRoute();
const id = route.params.id;

const { data: newsData, refresh }: any = await useFetch(`/api/news/${id}`)
const data = newsData?.value.data;
</script>