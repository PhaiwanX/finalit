import { defineStore } from "pinia";
import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isLoggedIn: false,
  }),
  actions: {
    async pretected() {
      const token = useCookie("token");
      if (token.value) {
        const user = await useFetch("/api/me", {
          method: "GET",
          headers: {
            authorization: `Bearer ${token.value}`,
          },
        });
        if (user.data.value.code === "SUCCESS") {
          this.user = user.data.value.data;
          this.isLoggedIn = true;
        } else {
          this.logout();
        }
      }
    },
    async login({ email, password }) {
      try {
        const response = await useFetch("/api/login", {
          method: "POST",
          body: { email, password },
        });

        if (response.data.value.code === "SUCCESS") {
          const user = await useFetch("/api/me", {
            method: "GET",
            headers: {
              authorization: `Bearer ${response.data.value.token}`,
            },
          });
          if (user.data.value.code === "SUCCESS") {
            this.user = user.data.value.data;
            this.isLoggedIn = true;
            useCookie("token").value = response.data.value.token;
            localStorage.setItem("token", response.data.value.token);
            // Swal.fire({
            //
            //     text: 'เข้าสู่ระบบเรียบร้อย',
            //     icon: 'success',
            // })
            Toast.fire({
              icon: "success",
              title: "เข้าสู่ระบบเรียบร้อย",
            });
          } else {
            Toast.fire({
              text: response.data.value.message,
              icon: "error",
            });
          }
        } else {
          Toast.fire({
            text: response.data.value.message,
            icon: "error",
          });
        }
      } catch (error) {}
    },
    async register({ username, email, password, confirm_password }) {
      try {
        if (password !== confirm_password) {
          Toast.fire({
            text: "รหัสผ่านไม่ตรงกัน",
            icon: "error",
          });
          return;
        }

        const response = await useFetch("/api/new", {
          method: "POST",
          body: { username, email, password },
        });

        if (response.data.value.code === "SUCCESS") {
          Toast.fire({
            text: response.data.value.message,
            icon: "success",
          });

          const router = useRouter();
          router.push("/login");
        } else {
          Toast.fire({
            text: response.data.value.message,
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error during registration:", error);
        Toast.fire({
          text: "เกิดข้อผิดพลาด กรุณาลองอีกครั้ง",
          icon: "error",
        });
      }
    },
    async logout(router) {
      Swal.fire({
        title: "ระบบ!",
        text: "แน่ใจไหมว่าต้องการออกจากระบบ",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่!",
        cancelButtonText: "ไม่!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.user = null;
          this.isLoggedIn = false;
          this.token = "";
          localStorage.removeItem("token");
          useCookie("token").value = null;
          router.push("/");
          Toast.fire({
            text: "ออกจากระบบแล้ว",
            icon: "success",
          });
        }
      });
    },
  },
});
