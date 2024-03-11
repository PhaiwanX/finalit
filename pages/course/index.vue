<template>
    <div class="px-2 md:px-20 my-5">
        <div v-for="(data, key) in courses">
            <span class="text-3xl"> {{ data.title }}</span><br>
            <span>{{ data.description }}</span>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div v-for="(term, key) in data.term">
                    <table class="table w-full mx-auto border border-zinc-950 text-sm rounded-md my-5">
                        <thead>
                            <tr>
                                <th class="py-4 px-6 text-xl font-bold bg-amber-900/30" colspan="2">{{ term.title }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(subject, key) in term.subjects" :key="key">
                                <td class="py-2 px-6 text-base font-bold border border-zinc-950 w-3/12">{{ subject.code
                                    }}
                                </td>
                                <td class="py-2 px-6 text-base border border-zinc-950 w-9/12">{{ subject.name }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">


const { data, refresh }: any = await useFetch('/api/course')
const courses = data.value.data
</script>