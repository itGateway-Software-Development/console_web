<script lang="ts" setup>
import { X } from "lucide-vue-next";
import { computed, ref } from "vue";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { Plus } from "lucide-vue-next";

const emit = defineEmits(["update:modelValue", "onAddUpdate", "onSubmitted"]);

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  formData: {
    type: Object,
    default: {}
  },
  serverTypes: {
    type: Array <any[]>,
    default: []
  },
  isEdit: {
    type: Boolean,
    default: false
  }
});



const preparedData:any = ref(props.formData);
const inputVersion = ref('');

const addVersion = () => {
  preparedData.value.versions.push(inputVersion.value);
  inputVersion.value = "";
}

const removeVersion = (version: String) => {
  preparedData.value.versions = preparedData.value.versions.filter((v:any) => v !== version);
};

const rules = {
  name: { required }, 
  image: { required },
  status: { required }, 
};

//define validation
const v$ = useVuelidate(rules, preparedData.value);

const onFileUploaded = (file: any) => {
  preparedData.value.image = file[0]?.raw;
};

const errorMsg = ref("");
const isSelectErrror = ref(false);
const createEditModal = computed({
  get() {
    return props.modelValue;
  },
  set(newVal: boolean) {
    emit("update:modelValue", newVal);
  }
});

const uploadForm = async () => {
  if(preparedData.value.server_types.length == 0) {
    isSelectErrror.value = true;
    errorMsg.value = "Please fill in all required fields.";
  } else {
    isSelectErrror.value = false;
    errorMsg.value = '';
  }
  v$.value.$touch(); // Trigger validation
  if (v$.value.$invalid) {
    errorMsg.value = "Please fill in all required fields.";
    return;
  } else {
    errorMsg.value = '';
  }

  if(!v$.value.$invalid && !isSelectErrror.value) {
      emit('onSubmitted', preparedData.value);
  }
};

</script>
<template>
  <TModal v-model="createEditModal" size="large">
    <template #content>
      <div
        class="flex items-center justify-between p-4 border-b border-slate-200 dark:border-zink-500"
      >
        <h5 class="text-16" id="exampleModalLabel">
          {{ isEdit ? "Update Operation System" : "Add Operation System" }}
        </h5>
        <TButton
          icon
          variant="plain-soft"
          class="p-0"
          color="slate"
          @click="createEditModal = false"
        >
          <X />
        </TButton>
      </div>
      <div class="p-4">
        <div class="text-sm text-red-500 mb-3">{{ errorMsg }}</div>
        <TInputField
          v-model="preparedData.name"
          label="Operation System name"
          placeholder="Enter OS"
          required
          class="mb-5 "
          :error="v$.name.$error"
        />

        <div class="my-5">
          <label for="" class="text-base font-medium">Server Types <span class="text-red-500">*</span> (Multi Select)</label>
          <br>
          <TMultiSelect
            v-model="preparedData.server_types"
            :options="props.serverTypes"
            multiple
            mode="tags"
          />
          <span class="text-red-500" v-if="isSelectErrror">Please select server types</span>
        </div>

        <TCard title="Location Image">
          <TFileUploader :error="v$.image.$error" :image="preparedData.image" @uploadFiles="onFileUploaded" dashed />
        </TCard>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="col-span-1">
            <div class="mb-2 flex justify-between items-center">
              <label for="" class="text-base font-medium">Versions</label>
              <Plus class="fill-slate-400 cursor-pointer hover:text-default-500 duration-100 w-[20px] h-[20px] me-[90px]"  />
            </div>
            <div class="flex items-center gap-2">
                <TInputField
                  placeholder="Enter version"
                  v-model="inputVersion"
                />
                <svg @click="addVersion" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="green" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check cursor-pointer"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="col-span-1">
            <div class="flex items-center gap-2 ps-2" v-for="(version, index) in preparedData.versions" :key="index">
              <span class="w-[50%] bg-slate-900 py-1 px-3 mb-1">{{version}}</span>
              <div class="flex gap-1 items-center">
                <svg @click="removeVersion(version)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="red" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x cursor-pointer"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
              </div>
            </div>
          </div>
        </div>
     
        <div class="mb-2 mt-8">
          <label class="mb-2 text-base font-medium">Status</label>
          <span class="text-red-500">*</span>
        </div>
        <TSwitch @change="preparedData.status = preparedData.status ==1 ? 0 : 1" class="mb-5" color="orange" v-model="preparedData.status" :checked="preparedData.status == 1" :id="'default-switch-' + 1">
          {{preparedData.status == 1 ? "Active" : "Inactive"}}
        </TSwitch>

        <div class="flex gap-2 justify-end mt-3">
          <TButton color="slate" @click="createEditModal = false">
            Close
          </TButton>
          <TButton color="orange" @click="uploadForm">
            {{ isEdit ? "Update" : "Add OS" }}
          </TButton>
        </div>
      </div>
    </template>
  </TModal>
</template>
