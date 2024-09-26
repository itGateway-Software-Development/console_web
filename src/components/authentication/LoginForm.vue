<script lang="ts" setup>
import { computed, nextTick, ref } from "vue";
import { authService } from "@/app/service/httpService/httpServiceProvider.ts";
import { useRouter } from "vue-router";
import { LAYOUT_TYPES } from "@/layouts/types.ts";
import { LS_KEY_USER } from "@/app/const.ts";
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

const tabClass = `inline-block px-4 w-full py-2 text-base transition-all duration-300 ease-linear rounded-md text-slate-500 bg-slate-100 dark:text-zink-200 dark:bg-zink-600 border border-transparent group-[.active]:bg-custom-500 dark:group-[.active]:bg-custom-500 group-[.active]:text-white dark:group-[.active]:text-white hover:text-custom-500 dark:hover:text-custom-500 active:text-custom-500 dark:active:text-custom-500 -mb-[1px]`;

const form = ref({
  email: { value: "", isValid: true },
  password: { value: "", isValid: true },
  isRemember: true
});

const isSubmitted = ref(false);
const isSucceed = ref(false);
const errorMsg = ref("");
const loading = ref(false);

const isValidForm = computed(() => {
  const { email, password, isRemember} = form.value;
  return email.isValid && password.isValid && isRemember ;
});

const getTitleColor = computed(() => {
  if (props.layout === BOXED || props.layout === COVER) {
    return "text-default-500 dark:text-default-500";
  }
  return "text-custom-500 dark:text-custom-500";
});
const onSignIn = async () => {
  isSubmitted.value = true;
  errorMsg.value = "";
  loading.value = true;
  if (isValidForm.value) {
    try {
      const { password, email} = form.value;
      const payload: any = {
        password: password.value,
        email: email.value,
      };

      const res = await authService.login(payload);
      if(res.data.status == "not_verify") {
        loading.value = false;
        const data = {...res.data.user, token: res.data.token, validEmail: false}
        userLocalStorage.setItems(data);

        router.push({path: '/verify-email'})

      } else if(res.data.status == 'success') {
        loading.value = false;
        const data = {...res.data.user, token: res.data.token, validEmail: true}
        userLocalStorage.setItems(data);
        await nextTick(() => {
          router.push({name: 'Dashboard'})
        })
      }
      
    } catch (error: any) {
      errorMsg.value = error.message;
    }
  }
};
</script>
<template>
  <div class="text-center">
    <h4 class="mb-1" :class="getTitleColor">Welcome Back !</h4>
    <p class="text-slate-500 dark:text-zink-200">
      Sign in to continue to itGateway Cloud.
    </p>
  </div>

  <div :class="layout === MODERN ? 'lg:w-[25rem] mx-auto' : ''" class="mt-10">
    <div
      v-show="isSucceed"
      class="text-wrap px-4 py-3 mb-3 text-sm text-green-500 border border-green-200 rounded-md bg-green-50 dark:bg-green-400/20 dark:border-green-500/50"
    >
      You have <b>successfully</b> signed in.
    </div>
    <TAlert v-show="errorMsg" color="red" bordered class="mb-3">
      {{ errorMsg }}
    </TAlert>
    <div>
      <TValidationInputField
        v-model="form.email"
        label="UserName/ Email ID"
        :rules="['required']"
        :submit="isSubmitted"
        placeholder="Enter email"
      />
      <TValidationInputField
        v-model="form.password"
        label="Password"
        type="password"
        :rules="['required']"
        :submit="isSubmitted"
        placeholder="Enter password"
      />
      <!-- <TCheckbox v-model="form.isRemember" id="sign-in-remember">
        <span class="text-base font-medium"> Remember me </span>
      </TCheckbox>
      <div
        v-if="isSubmitted && !form.isRemember"
        class="mt-1 text-sm text-red-500"
      >
        Please check the "Remember me" before submitting the form.
      </div> -->
    </div>
    <div class="mt-10">
      <Button :text="loading ? 'Loading...' : 'Sign In'" class="w-full" @click="onSignIn" />
    </div>
    
    <!-- <div
      class="relative text-center my-9 before:absolute before:top-3 before:left-0 before:right-0 before:border-t before:border-t-slate-200 dark:before:border-t-zink-500"
    >
      <h5
        class="inline-block px-2 py-0.5 text-sm bg-white text-slate-500 dark:bg-zink-600 dark:text-zink-200 rounded relative"
      >
        Sign In with
      </h5>
    </div> -->

    <!-- <div class="flex flex-wrap justify-center gap-2">
      <TButton
        v-for="(item, index) in socialMedias"
        :key="'login-social-media-' + index"
        icon
        :variant="layout === MODERN ? 'soft' : ''"
        class="p-0"
        :color="item.color"
      >
        <component :is="item.icon" class="size-4" />
      </TButton>
    </div> -->

    <div class="mt-7 text-center">
      <p class="mb-0 text-slate-500 dark:text-zink-200">
        Don't have an account ?
        <router-link
          :to="`/register`"
          class="font-semibold underline transition-all duration-150 ease-linear text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500"
        >
          SignUp
        </router-link>
      </p>
    </div>

    <div class="flex justify-center mt-5">
      <router-link
        to="/reset-password"
        class="underline text-custom-500 text-13"
        >Forgot Password ?</router-link
      >
    </div>
  </div>
</template>
