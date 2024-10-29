<script lang="ts" setup>
import { X } from "lucide-vue-next";
import { computed, ref } from "vue";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

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
  isEdit: {
    type: Boolean,
    default: false
  }
});

const preparedData:any = ref(props.formData);

const rules = {
  name: { required }, 
  status: { required }, 
};

//define validation
const v$ = useVuelidate(rules, preparedData.value);

const errorMsg = ref("");
const createEditModal = computed({
  get() {
    return props.modelValue;
  },
  set(newVal: boolean) {
    emit("update:modelValue", newVal);
  }
});

const uploadForm = async () => {

  v$.value.$touch(); // Trigger validation
  if (v$.value.$invalid) {
    errorMsg.value = "Please fill in all required fields.";
    return;
  } else {
    errorMsg.value = '';
  }

  if(!v$.value.$invalid) {
      emit('onSubmitted', {...preparedData.value});
  }
};

</script>
<template>
  <TModal v-model="createEditModal" size="x-large">
    <template #content>
      <div
        class="flex items-center justify-between p-4 border-b border-slate-200 dark:border-zink-500"
      >
        <h5 class="text-16" id="exampleModalLabel">
          {{ isEdit ? "Update Server" : "Add Server" }}
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
          label="Server Type Name"
          placeholder="Enter server type"
          required
          class="mb-5 "
          :error="v$.name.$error"
        />
     
        <div class="mb-2">
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
            {{ isEdit ? "Update" : "Add Server" }}
          </TButton>
        </div>
      </div>
    </template>
  </TModal>
</template>
