<script lang="ts" setup>
import { userSettingService } from "@/app/service/httpService/httpServiceProvider";
import { LAYOUT_TYPES } from "@/layouts/types.ts";
import { askConfirmation, successProcess, toastError, toastSuccess } from "@/plugins/sweetAlert";
import { computed, ref } from "vue";
import { authService } from "@/app/service/httpService/httpServiceProvider.ts";
import { useRouter } from "vue-router";

const authUser = authService.getUser();
const router = useRouter();

defineProps({
  layout: {
    type: String,
    default: LAYOUT_TYPES.BASIC,
  },
});

const loading = ref(false);
const email = ref(authUser ? authUser.email : null);
const resetCode = ref(null);
const errorMsg = ref("");
const successMsg = ref("");
const waitingTime = ref(60)
const isValidReset = ref(false);
let intervalId: number | undefined = undefined;


  const sendResetCode = async () => {
    if (email.value) {

      if (waitingTime.value === 0) {
        waitingTime.value = 60;
      }
      
      // Start the interval
      intervalId = setInterval(() => {
        if (waitingTime.value > 0) {
          --waitingTime.value;
        } else {
          waitingTime.value = 10;
          clearInterval(intervalId);
        }
      }, 1000);

      loading.value = true;
      successMsg.value = '';
      errorMsg.value = '';
      const res = await userSettingService.sendPwResetCode(email.value);

      if (res.data.status == "success") {
        loading.value = false;
        errorMsg.value = "";
        successMsg.value = res.data.message;
        
      }

      if(res.data.status == 'error') {
        toastError('Something Wrong !')
        errorMsg.value = res.data.message

        waitingTime.value = 60;
        clearInterval(intervalId);
      }
    } else {
      toastError("Please fill email");
    }
  };

  const checkResetCode = async() => {
    if(resetCode) {
      loading.value = true;
      successMsg.value = '';
      errorMsg.value = '';

      const payload = {email: email.value, resetCode: resetCode.value}

      const res = await userSettingService.checkPwResetCode(payload);
      
      if(res.data.status == 'error') {
        toastError('Something Wrong !');
        errorMsg.value = res.data.message;
        loading.value = false;
      }

      if(res.data.status == 'success') {
        isValidReset.value = true;
      }

    } else {
      toastError('Please fill code')
    }
  }

  const isSubmitted = ref(false);

  const form = ref <{new_password: String, new_password_confirmation: String}>({
    new_password: '',
    new_password_confirmation: '',
  });

  const password_error = ref('');
  const showNewPw = ref(false);
  const showNewPwConfrim = ref(false);

  const checkPassword = computed(() => {
    if(form.value.new_password && form.value.new_password.length < 6) {
        password_error.value = "Password must be min 6 characters"
    } else {
        password_error.value = ""
    }
  })

  const isValidForm = computed(() => {
      const {new_password, new_password_confirmation} = form.value;

      return new_password && new_password_confirmation && new_password === new_password_confirmation;
  })

  const resetPassword = () => {
    if(isValidForm) {
        askConfirmation().then(async(result) => {
            if(result.isConfirmed) {
                try{
                    isSubmitted.value = true;
                    const {new_password, new_password_confirmation} = form.value

                    const payload: any = {email: email.value, new_password, new_password_confirmation};

                    const res = await userSettingService.resetPassword(payload);

                    if(res.data.status == 'error') {
                        toastError('Something Wrong !');
                        errorMsg.value = res.data.message
                    }

                    if(res.data.status == 'success') {
                        
                        form.value  = {
                            new_password: '',
                            new_password_confirmation: ''
                        }

                        authService.removeUser();

                        successProcess('Success !', 'Please Login again.').then(async(result) => {
                          if(result.isConfirmed) {
                            router.push({name: 'Login'})
                          }
                        })
                    }
    
                }catch(error: any) {
                    errorMsg.value = error;
                    toastError('Something Wrong !');
                }
            }
        })
    } else {
        toastError('Invalid Inputs!')
    }
}

</script>
<template>
  <div class="text-center">
    <p class="mb-8 text-slate-500 dark:text-zink-200">Reset your password</p>
  </div>

  <div
    v-if="!successMsg && !errorMsg && !isValidReset"
    class="px-4 py-3 mb-6 text-sm text-yellow-500 border border-transparent rounded-md bg-yellow-50 dark:bg-yellow-400/20"
  >
    Provide your email address, and reset code will be sent to you 
  </div>

  <div
    v-if="successMsg"
    class="px-4 py-3 mb-6 text-sm text-green-500 border border-transparent rounded-md bg-green-50 dark:bg-green-400/20"
  >
    {{ successMsg }}
  </div>

  <div
    v-if="errorMsg"
    class="px-4 py-3 mb-6 text-sm text-red-500 border border-transparent rounded-md bg-red-50 dark:bg-red-400/20"
  >
    {{ errorMsg }}
  </div>

  <form autocomplete="off" v-if="!isValidReset" action="/" >
    <TInputField hide-details placeholder="Email" v-model="email" :readonly="authUser.email ? true : false">
      <template #suffix-outer>
        <div
          class="inline-block px-3 py-2 border border-l-1 border-slate-200 bg-slate-100 dark:border-zink-500 dark:bg-zink-600 ltr:rounded-r-md rtl:rounded-l-md cursor-pointer dark:hover:border-default-300"
          @click="sendResetCode"
          v-if="waitingTime == 60"
        >
          <span class="text-sm"> Get Code</span>
        </div>

        <div
          class="inline-block px-4 py-[8px] border border-l-1 border-slate-200 bg-slate-100 dark:border-zink-500 dark:bg-zink-600 ltr:rounded-r-md rtl:rounded-l-md cursor-pointer dark:hover:border-default-300"
          v-else
        >
          <span class="text-sm">{{waitingTime}} s</span>
        </div>
      </template>
    </TInputField>

    <TInputField placeholder="Reset Code" class="mt-5" v-model="resetCode" />

    <div class="mt-8">
      <Button
        text="Next"
        type="button"
        @click="checkResetCode"
      />
    </div>
    <div class="mt-4 text-center">
      <p class="mb-0">
        Wait, I remember my password...
        <router-link
          to="/user-profile"
          class="underline fw-medium text-custom-500"
        >
          Click here
        </router-link>
      </p>
    </div>
  </form>
  
  <form action="#" v-else>
    <div class="mb-10">
      <div class="relative">
        <TInputField
              placeholder="Enter new password"
              v-model="form.new_password"
              required
              :type="showNewPw ? 'text' : 'password'"
               @input="checkPassword"
            >
              <template #suffix>
                <i
                  class="align-middle ri-eye-fill text-slate-500 dark:text-zink-200 cursor-pointer"
                  @mousedown="showNewPw = true" 
                  @mouseup="showNewPw = false" 
                  @mouseleave="showNewPw = false"
                ></i>
              </template>
            </TInputField>
            <span
              v-if="password_error"
              class="text-sm text-red-700"
              >{{password_error}}</span
            >
       
      </div>
    </div>
    <div>
      <div class="relative">
        <TInputField
              placeholder="Confirm password"
              v-model="form.new_password_confirmation"
              required
              :type="showNewPwConfrim ? 'text' : 'password'"
            >
              <template #suffix>
                <i
                  class="align-middle ri-eye-fill text-slate-500 dark:text-zink-200 cursor-pointer"
                  @mousedown="showNewPwConfrim = true" 
                  @mouseup="showNewPwConfrim = false" 
                  @mouseleave="showNewPwConfrim = false"
                ></i>
              </template>
            </TInputField>
            <span
              v-if="
                form.new_password_confirmation &&
                form.new_password_confirmation != form.new_password
              "
              class="text-sm text-red-700"
              >Password Not Match</span
            >
      </div>
    </div>
    <div class="mt-14">
      <Button text="Save" type="button" @click="resetPassword" />
    </div>
  </form>
</template>
