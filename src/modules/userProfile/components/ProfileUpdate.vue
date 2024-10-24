<script lang="ts" setup>
import { computed, ref } from "vue";
import { userProfileService } from "@/app/service/httpService/httpServiceProvider.ts";
import { LS_KEY_USER } from "@/app/const.ts";
import LocalStorage from "@/app/service/localStorageService.ts";
import { askConfirmation, toastError, toastSuccess } from "@/plugins/sweetAlert";

const props = defineProps({
    authUser: {
        type: Object,
        required: true
    },
})

const userLocalStorage = new LocalStorage(LS_KEY_USER);

const loading = ref(false);
const isSubmitted = ref(false);
const errorMsg = ref("");

const form = ref({
  id: props.authUser.id,
  email: props.authUser.email,
  name: props.authUser.name,
  phone: props.authUser.phone,
  address: props.authUser.address,
});

const isValidForm = computed(() => {
  const { name, phone, address} = form.value;
  return name && phone && address ;
});

const updateProfile = async() => {
  isSubmitted.value = true;
  loading.value = true;
  
  if(isValidForm.value) {
    askConfirmation().then(async (result) => {
      if(result.isConfirmed) {
        try {
          const { id, name, phone, address} = form.value;
          const payload: any = {
            id,
            name,
            phone,
            address
          };

          const res = await userProfileService.updateProfile(payload, props.authUser.token);
          if(res.data.status == 'success') {
            toastSuccess('Successfully Upated')
            loading.value = false;
            errorMsg.value = '';
            let data = userLocalStorage.getItems();
            data = {...res.data.user, token: data.token, validEmail: true}
            userLocalStorage.setItems(data);

            // Refresh the form data with updated values
            form.value = {
              ...form.value,
              ...res.data.user 
            };
          }
          
        } catch (error: any) {
          toastError('Something Wrong!')
          errorMsg.value = error.message;
        }
      }
    })
  }else {
    toastError('Invalid values !')
    loading.value = false
  }
}

</script>
<template>
    <TCard title="Change Profile Data">
        <TAlert v-show="errorMsg" color="red" bordered class="mb-3">
          {{ errorMsg }}
        </TAlert>
        <form class="mt-7">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div class="col-span-1">
             <div class="flex flex-col gap-2">
                <label for="" >Email <span class="text-red-700">*</span></label>
                <div class="flex gap-2">
                  <TInputField class="flex-grow " type="email" v-model="form.email" readonly/>
                  <!-- <div>
                    <Button text="Change" type="button" />
                  </div> -->
                </div>
             </div>
            </div>

            <div class="col-span-1">
              <TInputField label="Name" class="flex-grow " type="text" placeholder="Enter name" v-model="form.name"/>
              <span v-if="isSubmitted && !form.name" class="text-red-700 ">Please fill</span>
            </div>

            <div class="col-span-1">
              <TInputField label="Phone" class="flex-grow " type="text" placeholder="Enter phone" v-model="form.phone"/>
              <span v-if="isSubmitted && !form.phone" class="text-red-700 ">Please fill</span>
            </div>

            <div class="col-span-1">
              <TTextarea :rows="6" label="Address" placeholder="Enter your address" v-model="form.address" />
              <span v-if="isSubmitted && !form.address" class="text-red-700 ">Please fill</span>
            </div>

          </div>

          <div class="mt-14 w-[25%]">
            <Button :text="loading ? 'Loading...' : 'Update'" class="w-full" type="button" @click="updateProfile"/>
          </div>
        </form>
      </TCard>
</template>