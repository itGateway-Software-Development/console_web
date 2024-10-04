<script lang="ts" setup>
import { computed, nextTick, ref } from "vue";
import { authService } from "@/app/service/httpService/httpServiceProvider.ts";
import { useRouter } from "vue-router";
import { LS_KEY_USER } from "@/app/const.ts";
import LocalStorage from "@/app/service/localStorageService.ts";
import Logo from "@/assets/images/logo.png";
import { ArrowRight } from "lucide-vue-next";
import LanguageDropdown from "@/app/layout/navbar/Language.vue";

const userLocalStorage = new LocalStorage(LS_KEY_USER);

const router = useRouter();

const form = ref({
  email: "",
  password: "",
});

const isSubmitted = ref<Boolean>(false);
const isSucceed = ref(false);
const errorMsg = ref("");
const loading = ref(false);
const isShowPassword = ref(false);
const isEmailError = ref(false);
const isPasswordError = ref(false);

const isValidForm = computed(() => {
  const { email, password } = form.value;

  isEmailError.value = !email;
  isPasswordError.value = !password;

  return email && password;
});

const resetForm = () => {
  form.value.email = '';
  form.value.password = '';
  loading.value = false;
  isEmailError.value = false;
  isPasswordError.value = false;
}

const onSignIn = async () => {
  isSubmitted.value = true;
  errorMsg.value = "";
  if (isValidForm.value) {
    loading.value = true;

    try {
      const { email, password } = form.value;
      const payload: any = {
        password: password,
        email: email,
      };

      const res = await authService.login(payload);
      if (res.data.status == "not_verify") {
        loading.value = false;
        const data = {
          ...res.data.user,
          token: res.data.token,
          validEmail: false,
        };
        userLocalStorage.setItems(data);

        router.push({ path: "/verify-email" });
      } else if (res.data.status == "success") {
        loading.value = false;
        const data = {
          ...res.data.user,
          token: res.data.token,
          validEmail: true,
        };
        userLocalStorage.setItems(data);
        await nextTick(() => {
          router.push({ name: "Dashboard" });
        });
      }
    } catch (error: any) {
      errorMsg.value = error.message;
      resetForm()
    }
  }
};
</script>
<template>
  <section class="h-screen flex justify-center items-center auth-bg relative">
    <div class="absolute top-5 right-14 hidden lg:block">
      <LanguageDropdown show-name />
    </div>
    <div class="w-full grid lg:grid-cols-5 items-center px-3 sm:px-20 md:px-40 lg:px-10 xl:px-40 2xl:px-64">
      <div class="hidden lg:block lg:col-span-3 pe-3 lg:pe-10 2xl:pe-20">
        <div class="flex flex-col gap-12 ">
          <h4 class="text-lg lg:text-3xl xl:text-4xl font-remix">
            Build, Test and Run your Workloads with our Dedicated VMs that Offer Additional Services to Enhance your Experience
          </h4>
          <p class="text-slate-300 font-remix text-lg text-wrap">
            Enjoy a 2-4 weeks trial period, additional cloud backup storage and up to 50% cost saving compared to other cloud platform​
          </p>
          <div class="flex gap-2 items-center"> 
            <a href="#" class="text-slate-300 text-md">Learn More </a><ArrowRight class="w-[18px] text-slate-300"/>
          </div>
        </div>
      </div>
      <div class="col-span-1 lg:col-span-2  lg:ps-3 xl:ps-10 2xl:ps-20">
        <div class="auth-form-bg">
          <div class="px-10 py-1">
            <div class="flex justify-center">
              <img class="w-28" :src="Logo" alt="" />
            </div>
            <div class="text-start mb-8">
              <h4 class="text-white text-lg">Sign In</h4>
              <p class="text-white text-xs">To manage your cloud resources​</p>
            </div>
  
            <div>
              <div
                v-show="isSucceed"
                class="text-wrap px-4 py-3 mb-3 text-sm text-green-500 border border-green-200 rounded-md bg-green-50 dark:bg-green-400/20 dark:border-green-500/50"
              >
                You have <b>successfully</b> signed in.
              </div>
              <TAlert v-show="errorMsg" color="red" bordered class="mb-10">
                {{ errorMsg }}
              </TAlert>
              <div>
                <div class="relative z-0 w-full mb-7 group">
                  <input
                    v-model="form.email"
                    :submit="isSubmitted"
                    type="text"
                    name="floating_email"
                    id="floating_email"
                    :class="`block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b ${isEmailError ? 'border-red-900' : 'border-slate-300'} appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-gray-300 peer`"
                    placeholder=" "
                    required
                  />
                  <label
                    for="floating_email"
                    class="peer-focus:font-medium absolute text-sm text-slate-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Email, Phone or User ID</label
                  >
                  <span v-if="isSubmitted && isEmailError" class="text-sm text-red-900">Email is required !</span>
                </div>
  
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    v-model="form.password"
                    :submit="isSubmitted"
                    :type="isShowPassword ? 'text' : 'password'"
                    name="floating_email"
                    id="floating_email"
                    :class="`block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b ${isPasswordError ? 'border-red-900' : 'border-slate-300'} appearance-none dark:text-white focus:outline-none focus:ring-0 focus:border-gray-300 peer`"
                    placeholder=" "
                    required
                  />
                  <label
                    for="floating_email"
                    class="peer-focus:font-medium absolute text-sm text-slate-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Password</label
                  >
                  <span v-if="isSubmitted && isPasswordError" class="text-sm text-red-900">Password is required !</span>
  
                </div>
              </div>
              <div class="flex justify-between">
                <div>
                  <div class="flex items-center mb-4">
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
  
                <div class="flex justify-center">
                  <router-link
                    to="/reset-password"
                    class="underline underline-offset-4 text-slate-300 text-sm"
                    >Forgot Password ?</router-link
                  >
                </div>
              </div>
              <div class="my-10">
                <Button
                  :text="loading ? 'Loading...' : 'Sign In'"
                  class="w-full mb-5"
                  @click="onSignIn"
                />
                <router-link
                  :to="`/register`"
                  class="font-semibold underline transition-all duration-150 ease-linear text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500"
                >
                  <DefaultButton text="Create New Account" class="w-full" />
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
