<script lang="ts" setup>
import { LAYOUT_TYPES } from "@/layouts/types.ts";
import { onMounted, ref } from "vue";
import LocalStorage from "@/app/service/localStorageService.ts";
import { LS_KEY_USER } from "@/app/const.ts";
import axios from "axios";
import api from "@/app/service/api/url";
import { useRouter } from "vue-router";


const userLocalStorage = new LocalStorage(LS_KEY_USER);
const {VITE_API_ACCESS_TOKEN} = import.meta.env;
const errorMsg = ref("");
const router = useRouter();

const id = ref<string | null>(null);
const input_otp = ref();

const verifyEmail = async() => {
  const data = { input_otp : input_otp.value, id : id.value }
  if(!input_otp.value || input_otp.value.length < 6) {
    errorMsg.value = "Please enter valid OTP"
  }
  try{
    const res = await axios.post(api.verify_email , data);
    console.log(res);
    if(res.data.status == 'success') {
      let data = userLocalStorage.getItems();
      data.validEmail = true;
      userLocalStorage.setItems(data);

      router.push({ path: "/" });
    } else {
      errorMsg.value = res.data.message
    }
  }catch (error:any) {
    errorMsg.value = error.response?.data?.message || "Verification failed";
  }
}

onMounted(() => {
  const user = userLocalStorage.getItems();
  id.value = user.id;
})

defineProps({
  layout: {
    type: String,
    default: LAYOUT_TYPES.BASIC
  }
});
</script>
<template>
  <div class="mt-8 text-center">
    <div
      v-show="errorMsg"
      class="px-4 py-3 mb-3 text-sm text-red-500 border border-red-200 rounded-md bg-red-50 dark:bg-red-400/20 dark:border-red-500/50"
    >
      {{ errorMsg }}
    </div>
    <h4 class="mb-1 text-custom-500 dark:text-custom-500">Verify Email</h4>
    <p class="mb-4 text-slate-500 dark:text-zink-200">
      We just sent the OTP to your email. Please enter below to verify email.
    </p>
    <TInputField
        v-model="input_otp"
        hide-details
        placeholder="Enter verification code"
        inputClass="rounded-full"
        class="text-center"
      />
    <TButton class="px-2 py-1.5 text-xs mx-auto mt-4" @click="verifyEmail"> Verify </TButton>
  </div>

  <div class="text-center pt-10">
    <img
      src="@/assets/images/auth-email.png"
      alt=""
      class="block mx-auto w-2/3"
    />
  </div>
</template>
