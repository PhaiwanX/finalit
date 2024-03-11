<template>
    <div class="bg-white rounded-lg border p-4">
        <img :src="data.image" alt="Placeholder Image" class="w-full h-48 rounded-md object-cover">
        <div class="px-1 py-4">
            <div class="font-bold text-xl mb-2">{{ data.title }}</div>
            <p class="text-gray-700 text-base">
                {{ truncatedContent }}
            </p>
        </div>
        <div class="px-1 py-4">
            <nuxt-link :to="`/news/${data._id}`" class="text-blue-500 hover:underline">อ่านเพิ่มเติม</nuxt-link>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
    computed: {
        truncatedContent() {
            if (this.data.content.length > 30) {
                return this.data.content.substring(0, 30) + '...';
            } else {
                return this.data.content;
            }
        }
    }
}
</script>
