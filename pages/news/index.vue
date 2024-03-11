<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-4">Latest News</h1>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <NewsCard v-for="(news, key) in data" :data="news" />

        </div>
    </div>
</template>

<script setup lang="ts">

const { data: newsData, refresh }: any = await useFetch('/api/news')
const data: any = newsData.value.data 
</script>

<style>
/* Add Tailwind CSS utilities here if needed */
</style>