<template>
    <div>
        <Hero />
        <div class="px-3 md:px-20 py-10">
            <span class="text-2xl font-bold">ข่าวสารและกิจกรรม</span>
            <div class="grid grid-cols-1 md:grid-cols-3 space-x-2 mt-3">
                <NewsCard v-for="(news, key) in topNews.data" :data="news" />
            </div>
        </div>
    </div>
</template>

<script setup>

const { data: topNews, refresh: topNewsRefresh } = await useFetch('/api/news/top');


</script>