<script lang="ts" setup>
import { computed, nextTick, ref } from "vue";
import { authService } from "@/app/service/httpService/httpServiceProvider.ts";
import { LS_KEY_USER } from "@/app/const.ts";
import { UserType } from "@/app/service/httpService/types.ts";
import { useRouter } from "vue-router";
import { LAYOUT_TYPES } from "@/layouts/types.ts";
import LocalStorage from "@/app/service/localStorageService.ts";

const userLocalStorage = new LocalStorage(LS_KEY_USER);

const { COVER, BOXED, MODERN } = LAYOUT_TYPES;
const props = defineProps({
  layout: {
    type: String,
    default: LAYOUT_TYPES.BASIC
  }
});
const router = useRouter();

const loading = ref(false);
const samePw = ref(true);

const form = ref({
  email: { value: "", isValid: false },
  name: { value: "", isValid: false },
  password: { value: "", isValid: false },
  password_confirmation: { value: "", isValid: false },
});

const checkPasswordMatch = () => {
  samePw.value = false;

  if(form.value.password.value == form.value.password_confirmation.value) {
    samePw.value = true;
  }
}

const isSubmitted = ref(false);
const isSucceed = ref(false);
const errorMsg = ref("");

const isValidForm = computed(() => {
  const { name, password, password_confirmation, email} = form.value;
  if(password.value == password_confirmation.value && name.value && email.value) {
    return true;
  } else {
    return false;
  }
});

const getTitleColor = computed(() => {
  if (props.layout === BOXED || props.layout === COVER) {
    return "text-default-500 dark:text-default-500";
  }
  return "text-custom-500 dark:text-custom-500";
});
const onRegister = async () => {
  isSubmitted.value = true;
  errorMsg.value = "";
  loading.value = true;
  console.log(isValidForm.value);
  if (isValidForm.value) {
    try {
      const { password, name, password_confirmation,  email } = form.value;
      const payload: UserType = {
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
        name: name.value,
      };

      const res = await authService.register(payload);

      if(res.data.status == 'success') {
        loading.value = false;

        const data = {...res.data.user, token: res.data.token, validEmail: false}

        userLocalStorage.setItems(data);

        await nextTick(() => {
          router.push({ path: "/verify-email" });
        })
      }
    
    } catch (error: any) {
      errorMsg.value = error.message;
      loading.value = false;
    }
  }
};
</script>
<template>

  <div class="text-center">
    <h4 class="mb-1" :class="getTitleColor">Create your free account</h4>
    <p class="text-slate-500 dark:text-zink-200 text-wrap">
      Get your free itGateway Cloud account now
    </p>
  </div>

  <div :class="layout === MODERN ? 'lg:w-[25rem] mx-auto' : ''" class="mt-10">
    <div
      v-show="isSucceed"
      class="px-4 py-3 mb-3 text-sm text-green-500 border border-green-200 rounded-md bg-green-50 dark:bg-green-400/20 dark:border-green-500/50"
    >
      You have <b>successfully</b> created account.
    </div>
    <div
      v-show="errorMsg"
      class="px-4 py-3 mb-3 text-sm text-red-500 border border-red-200 rounded-md bg-red-50 dark:bg-red-400/20 dark:border-red-500/50"
    >
      {{ errorMsg }}
    </div>
    <div>
      <TValidationInputField
        v-model="form.email"
        label="Email"
        :rules="['required', 'email']"
        :submit="isSubmitted"
        placeholder="Enter email"
      />
      <TValidationInputField
        v-model="form.name"
        label="UserName"
        :rules="['required']"
        :submit="isSubmitted"
        placeholder="Enter username"
      />

      <TValidationInputField
        v-model="form.password"
        label="Password"
        type="password"
        :rules="['required', 'minLength']"
        :submit="isSubmitted"
        placeholder="Enter password"
      />

      <TValidationInputField
        v-model="form.password_confirmation"
        label="Confirm Password"
        type="password"
        :rules="['required', 'minLength']"
        :submit="isSubmitted"
        @input="checkPasswordMatch"
        placeholder="Enter password"
      />
      <span v-if="!samePw" class="text-red-600 text-sm" style="margin-top: -50px;">
        Password not match !
      </span>
    </div>
    <p class="italic text-15 text-slate-500 dark:text-zink-200 text-wrap">
      By registering you agree to the itGateway Cloud
      <a href="#!" class="underline">Terms of Use</a>
    </p>

    <div class="mt-10">
      <Button :text="loading ? 'Loading...' : 'Sign Up'" class="w-full" @click="onRegister" />
    </div>
  

    <div class="mt-10 text-center">
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
</template>
