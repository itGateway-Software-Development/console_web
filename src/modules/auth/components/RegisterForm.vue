<script lang="ts" setup>
import { computed, nextTick, ref } from "vue";
import { authService } from "@/app/service/httpService/httpServiceProvider.ts";
import { LS_KEY_USER } from "@/app/const.ts";
import { UserType } from "@/app/service/httpService/types.ts";
import { useRouter } from "vue-router";
import LocalStorage from "@/app/service/localStorageService.ts";
import LanguageDropdown from "@/app/layout/navbar/Language.vue";
import Logo from "@/assets/images/logo.png";

const userLocalStorage = new LocalStorage(LS_KEY_USER);

const router = useRouter();

const loading = ref(false);
const samePw = ref(true);

const form = ref({
  email: "",
  name: "",
  password: "",
  password_confirmation: "",
});

const checkPasswordMatch = () => {
  samePw.value = false;

  if (form.value.password == form.value.password_confirmation) {
    samePw.value = true;
  }
};

const isSubmitted = ref(false);
const isSucceed = ref(false);
const errorMsg = ref("");
const isEmailError = ref(false);
const isNameError = ref(false);
const isPasswordError = ref(false);
const isPasswordConfirmError = ref(false);
const isShowPassword = ref(false);

const isValidForm = computed(() => {
  const { email, name, password, password_confirmation } = form.value;

  isEmailError.value = !email;
  isNameError.value = !name;
  isPasswordError.value = !password;
  isPasswordConfirmError.value = !password_confirmation;

  return email && name && password && password_confirmation && samePw.value;
});

const onRegister = async () => {
  isSubmitted.value = true;
  errorMsg.value = "";
  if (isValidForm.value) {
    loading.value = true;
    try {
      const { email, name, password, password_confirmation } = form.value;
      const payload: UserType = {
        email: email,
        password: password,
        password_confirmation: password_confirmation,
        name: name,
      };

      const res = await authService.register(payload);

      if (res.data.status == "success") {
        loading.value = false;

        const data = {
          ...res.data.user,
          token: res.data.token,
          validEmail: false,
        };

        userLocalStorage.setItems(data);

        await nextTick(() => {
          router.push({ path: "/verify-email" });
        });
      }
    } catch (error: any) {
      errorMsg.value = error.message;
      loading.value = false;
    }
  }
};
</script>
<template>
  <section class="h-screen flex justify-center items-center auth-bg relative">
    <div class="absolute top-5 right-14 hidden lg:block">
      <LanguageDropdown show-name />
    </div>
    <div class="w-[90%] sm:w-[450px] lg:w-[500px] auth-form-bg p-10 sm:py-0 px-10">
      <div class="flex justify-center">
        <img class="w-36" :src="Logo" alt="" />
      </div>

      <h4 class="text-white text-lg mb-3">Register itGateway Cloud Account</h4>

      <div
        v-if="errorMsg"
        class="px-4 py-3 mb-3 text-sm text-white border border-red-200 rounded-md bg-red-50 dark:bg-red-400/20 dark:border-red-500/50"
      >
        {{ errorMsg }}
      </div>

      <div>
        <div class="relative z-0 w-full mb-7 group">
          <input
            v-model="form.email"
            :submit="isSubmitted"
            type="text"
            name="floating_email"
            id="floating_email"
            :class="`block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b ${
              isEmailError ? 'border-red-900' : 'border-slate-300'
            } appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-gray-300 peer`"
            placeholder=" "
            required
          />
          <label
            for="floating_email"
            class="peer-focus:font-medium absolute text-sm text-slate-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Email, Phone or User ID</label
          >
          <span v-if="isSubmitted && isEmailError" class="text-sm text-red-900"
            >Email is required !</span
          >
        </div>
        <div class="relative z-0 w-full mb-7 group">
          <input
            v-model="form.name"
            :submit="isSubmitted"
            type="text"
            name="name"
            id="name"
            :class="`block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b ${
              isEmailError ? 'border-red-900' : 'border-slate-300'
            } appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-gray-300 peer`"
            placeholder=" "
            required
          />
          <label
            for="name"
            class="peer-focus:font-medium absolute text-sm text-slate-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >User Name</label
          >
          <span v-if="isSubmitted && isNameError" class="text-sm text-red-900"
            >UserName is required !</span
          >
        </div>

        <div class="relative z-0 w-full mb-5 group">
          <input
            v-model="form.password"
            :submit="isSubmitted"
            :type="isShowPassword ? 'text' : 'password'"
            name="floating_email"
            id="floating_email"
            :class="`block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b ${
              isPasswordError ? 'border-red-900' : 'border-slate-300'
            } appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-gray-300 peer`"
            placeholder=" "
            required
          />
          <label
            for="floating_email"
            class="peer-focus:font-medium absolute text-sm text-slate-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Password</label
          >
          <span
            v-if="isSubmitted && isPasswordError"
            class="text-sm text-red-900"
            >Password is required !</span
          >
        </div>

        <div class="relative z-0 w-full mb-3 group">
          <input
            v-model="form.password_confirmation"
            :submit="isSubmitted"
            :type="isShowPassword ? 'text' : 'password'"
            @input="checkPasswordMatch"
            name="floating_email"
            id="floating_email"
            :class="`block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b ${
              isPasswordConfirmError ? 'border-red-900' : 'border-slate-300'
            } appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-gray-300 peer`"
            placeholder=" "
            required
          />
          <label
            for="floating_email"
            class="peer-focus:font-medium absolute text-sm text-slate-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Password Confirmation</label
          >
          <span
            v-if="isSubmitted && isPasswordError"
            class="text-sm text-red-900"
            >Password Confirmation is required !</span
          >
          <span
            v-if="!samePw"
            class="text-red-600 text-sm"
            style="margin-top: -50px"
          >
            Password not match !
          </span>
        </div>
        <div class="flex items-center mb-7">
          <input
            id="showPw"
            type="checkbox"
            @change="isShowPassword = !isShowPassword"
            value=""
            class="w-4 h-4 text-zink-400 bg-[#a44411] border-gray-300 rounded focus:ring-default-500 focus:ring-0"
          />

          <label
            for="showPw"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Show Password
          </label>
        </div>
      </div>
      <p class="italic text-15 text-slate-500 dark:text-zink-200 text-wrap">
        By registering you agree to the itGateway Cloud
        <a href="#!" class="underline">Terms of Use</a>
      </p>

      <div class="mt-10">
        <Button
          :text="loading ? 'Loading...' : 'Register'"
          class="w-full"
          @click="onRegister"
        />
      </div>

      <div class="my-5 text-center">
        <p class="mb-0 text-slate-500 dark:text-zink-200 text-wrap">
          Already have an account ?
          <router-link
            :to="`/login`"
            class="font-semibold underline transition-all duration-150 ease-linear text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500"
          >
            Login
          </router-link>
        </p>
      </div>
    </div>
  </section>
</template>
