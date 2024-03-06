<template>
    <header class="bg-white shadow-lg h-24 md:flex">
        <a href="" class=" flex-shrink-0 flex items-center justify-center px-4">
            <img class="" src="https://itchaiyaphum.com/wp-content/uploads/2022/09/logoITCTC3.png" alt="" />
        </a>
        <nav class="header-links hidden md:contents font-semibold text-base ">
            <ul class="flex items-center ml-4 mr-auto">
                <li v-for="(item, index) in navItems" :key="index" class="p-3 rounded-lg hover:bg-gray-100">
                    <nuxt-link :to="item.page">
                        <span>{{ item.text }}</span>
                    </nuxt-link>
                </li>
            </ul>
        </nav>
        <nav class="hidden xl:contents">
            <ul class="flex items-center mr-4 ">
                <li v-for="(item, index) in socialMedia" :key="index" class="p-1">
                    <a :href="item.link"
                        class="inline-block rounded-full border py-2 px-3 hover:shadow-lg hover:border-opacity-0 duration-200 hover:-translate-y-0.5">
                        <i :class="item.icon"></i>
                    </a>
                </li>
            </ul>
        </nav>
        <div class="border hidden md:flex items-center px-4">
            <button class="bg-black hover:bg-gray-700 text-white font-bold px-4 py-2 rounded">ติดต่อเรา</button>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue';

const navItems = ref([
    {
        text: 'หน้าหลัก',
        page: '/',
    },
    {
        text: 'ข่าวสาร',
        page: '/news',
    },
    {
        text: 'เกี่ยวกับเรา',
        page: "/about",
    },
    {
        text: 'หลักสูตรการศึกษา',
        page: "/course",
    },
    {
        text: 'ติดต่อเรา',
        page: '/contact',
    },
]);

const socialMedia = ref([
    {
        icon: 'fab fa-facebook',
        link: '#',
    },
    {
        icon: 'fab fa-instagram',
        link: '#',
    },
    {
        icon: 'fas fa-cog',
        link: '/backend',
    }

]);
</script>
