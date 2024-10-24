<script lang="ts" setup>
import { userProfileService } from "@/app/service/httpService/httpServiceProvider";
import { askConfirmation, toastError, toastSuccess } from "@/plugins/sweetAlert";
import { computed, ref } from "vue";

const props = defineProps({
    authUser: {
        type: Object,
        required: true
    }
})

const isSubmitted = ref(false);
const errorMsg = ref("");

const form = ref <{old_password: String, new_password: String, new_password_confirmation: String}>({
  old_password: '',
  new_password: '',
  new_password_confirmation: '',
});

const password_error = ref('');

const checkPassword = computed(() => {
    if(form.value.new_password && form.value.new_password.length < 6) {
        password_error.value = "Password must be min 6 characters"
    } else {
        password_error.value = ""
    }
})

const isValidForm = computed(() => {
    const {old_password, new_password, new_password_confirmation} = form.value;

    return old_password != '' && new_password != '' && new_password_confirmation != '' && new_password === new_password_confirmation;
})

const showOldPw = ref(false);
const showNewPw = ref(false);
const showNewPwConfrim = ref(false);

const changePassword = () => {
    if(isValidForm.value) {
        askConfirmation().then(async(result) => {
            if(result.isConfirmed) {
                try{
                    isSubmitted.value = true;
                    const {old_password, new_password, new_password_confirmation} = form.value

                    const payload: any = {id: props.authUser.id, old_password, new_password, new_password_confirmation};

                    const res = await userProfileService.changePassword(payload, props.authUser.token);

                    if(res.data.status == 'error') {
                        toastError('Something Wrong !');
                        errorMsg.value = res.data.message
                    }

                    if(res.data.status == 'success') {
                        toastSuccess('Successfully Updated!')
                        form.value  = {
                            old_password: '',
                            new_password: '',
                            new_password_confirmation: ''
                        }
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
  <TCard title="Changes Password">
    <TAlert v-show="errorMsg" color="red" bordered class="mb-3">
        {{ errorMsg }}
      </TAlert>
    <form action="#!">
      <div class="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <div class="xl:col-span-4">
          <div class="relative">
            <TInputField
              label="Old Password"
              placeholder="Enter current password"
              v-model="form.old_password"
              required
              :type="showOldPw ? 'text' : 'password'"
            >
              <template #suffix>
                <i
                  class="align-middle ri-eye-fill text-slate-500 dark:text-zink-200 cursor-pointer"
                  @mousedown="showOldPw = true" 
                  @mouseup="showOldPw = false" 
                  @mouseleave="showOldPw = false"
                ></i>
              </template>
            </TInputField>
          </div>
        </div>
        <div class="xl:col-span-4">
          <div class="relative">
            <TInputField
              label="New Password"
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
        <div class="xl:col-span-4">
          <div class="relative">
            <TInputField
              label="Confirm Password"
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
      </div>
      <div class="flex justify-between items-center mt-10">
        <div class="">
          <router-link
            to="/reset-password"
            class="underline text-custom-500 text-13"
            >Forgot Password ?</router-link
          >
        </div>
        <div class="w-[25%]">
          <Button text="Change Password" type="button" @click="changePassword" />
        </div>
      </div>
    </form>
  </TCard>
</template>
