<template>
  <div class="mx-auto w-6/12 px-4 py-8">
    <h1 class="text-3xl font-bold mb-4">เกี่ยวกับเรา</h1>
    <div v-if="about" class="bg-white p-4 rounded-lg shadow-md">
      <p class="text-gray-600">{{ about.content }}
      </p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup>

const { data, refresh } = await useFetch('/api/about')
const about = data.value.data
</script>
