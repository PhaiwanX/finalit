<template>
    <div>
        <div class="bg-white rounded-md p-8 border-2 shadow-md mb-2">
            <span class="text-xl text-gray-800">{{ courseData.title }}</span>
            <div v-for="(subject, subjectIndex) in courseData.subjects" :key="subjectIndex"
                class="flex items-center my-2">
                <input v-model="subject.code" type="text" :id="'subject-code-' + subjectIndex"
                    :name="'subject-code-' + subjectIndex" placeholder="Enter code"
                    class="flex-grow border border-gray-300 rounded-md p-3 mr-2 focus:outline-none focus:ring focus:border-blue-500">
                <input v-model="subject.name" type="text" :id="'subject-name-' + subjectIndex"
                    :name="'subject-name-' + subjectIndex" placeholder="Enter Name"
                    class="flex-grow border border-gray-300 rounded-md p-3 mr-2 focus:outline-none focus:ring focus:border-blue-500">
                <button @click="removeSubject(subjectIndex)" class="bg-red-500 text-white px-4 py-3 rounded-md"><i
                        class="fas fa-trash"></i></button>
            </div>
            <button @click="addSubject" class="bg-gray-900 w-full text-white px-4 py-2 rounded-md mt-4"><i
                    class="fas fa-plus-square"></i> เพิ่มรายวิชา</button>
            <button @click="saveData"
                class="bg-white w-full text-dark border-2 border-gray-900 px-4 py-2 rounded-md mt-4"><i
                    class="fas fa-save"></i> บันทึกข้อมูล</button>
        </div>
    </div>
</template>

<script>
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

export default {
    props: {
        courseData: {
            type: Object,
            required: true,
        },
        id: String,
        term: String
    },
    methods: {
        addSubject() {
            this.courseData.subjects.push({ code: '', name: '' });
        },
        removeSubject(index) {
            this.courseData.subjects.splice(index, 1);
        },
        saveData() {
            const postData = {
                id: this.id,
                term: this.term,
                courseData: this.courseData
            };
            // Make a POST request with postData to '/api/course/:id/:term/edit'
            fetch(`/api/course/${this.id}/${this.term}/edit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            })
                .then(response => {
                    if (response.ok) {
                        // Handle successful response
                        Toast.fire({
                            icon : 'success',
                            text : 'บันทึกข้อมูลเรียบร้อย'
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
        }
    }
};
</script>

<style>
/* Add your styles here */
</style>
