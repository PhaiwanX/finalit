<template>
    <div class="bg-white relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0">
        <div
            class="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
            <svg class="absolute left-0 hidden h-full text-white transform -translate-x-1/2 lg:block"
                viewBox="0 0 100 100" fill="currentColor" preserveAspectRatio="none slice">
                <path d="M50 0H100L50 100H0L50 0Z"></path>
            </svg>
            <img class="object-cover w-full h-56 rounded-lg md:rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
                :src="heroData.image" alt="" />
        </div>
        <div class="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
            <div class="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
                <h2 class="mb-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {{ heroData.title }}
                </h2>
                <p class="pr-5 mb-5 text-base text-gray-700 md:text-lg">
                    {{ heroData.description }}
                </p>
            </div>
        </div>
        <!-- {{ heroData }} -->
    </div>
</template>

<script setup>

const { data } = await useFetch("/api/hero");
const heroData = data?.value.data[0]
</script>