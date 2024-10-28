<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Index from "@/modules/serverManagement/operationSystems/components/Index.vue";
import {
  operationSystemService,
  authService,
} from "@/app/service/httpService/httpServiceProvider";
import { OperationSystemType } from "@/modules/serverManagement/operationSystems/types/OperationSystemType";
import TableLoading from "@/modules/shared/TableLoading.vue";
import {headerItems} from "@/modules/serverManagement/operationSystems/utils";

const loading = ref(true);
const operationSystems = ref<OperationSystemType[]>([]);
const serverTypes = ref<[]>([]);
const getOS = async () => {
  const authUser = authService.getUser();
  const res = await operationSystemService.getOperationSystems(authUser.token);

  operationSystems.value = res.data.operationSystems;
  serverTypes.value = res.data.serverTypes;
  loading.value = false;
};

const isAllSelect = ref(false);

const onSelectAll = () => {
  isAllSelect.value = !isAllSelect.value;
  operationSystems.value = operationSystems.value.map((item) => {
    return {
      ...item,
      checked: isAllSelect.value,
    };
  });
};

const handleSubmitSuccess = async () => {
  loading.value = true;
  await getOS(); 
};

onMounted( () => {
     getOS();
});
</script>
<template>
  <PageHeader title="Operation Systems" :items="['Server Management', 'Operation System']" />
  <TCard class="overflow-x-auto" v-if="!loading">
    <Index
      id="location-table"
      :items="operationSystems"
      :serverTypes="serverTypes"
      :headerItems="headerItems"
      theadClass="bg-slate-100 dark:bg-zink-600"
      tdClass="px-3.5 py-2.5 border-y border-slate-200 dark:border-zink-500 id"
      tbodyClass="form-check-all"
      @onSelectAll="onSelectAll"
      @onSubmitted="handleSubmitSuccess"
    >
      <template #checked>
        <input
          class="size-4 border rounded-sm appearance-none cursor-pointer bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-custom-500 checked:border-custom-500 dark:checked:bg-custom-500 dark:checked:border-custom-500 checked:disabled:bg-custom-400 checked:disabled:border-custom-400"
          type="checkbox"
          value="option"
          name="chk_child"
          :checked="isAllSelect"
        />
      </template>

      <template #image="{ value }">
        <img
          class="w-10 h-10 rounded-full"
          :src="value.image"
          :alt="value"
          loading="lazy"
        />
      </template> 

      <template #versions="{ value }">
        <div class="flex flex-wrap gap-1">
          <span v-for="item in value.versions" :key="item.id" class="bg-default-700 text-xs px-2 rounded-lg">{{item.version_no}}</span>
        </div>
      </template> 

      <template #server_types="{ value }">
        <div class="flex flex-wrap gap-1">
          <span v-for="item in value.server_types" :key="item.id" class="bg-blue-500 px-2 py-1 rounded">{{item.label}}</span>
        </div>
      </template> 

      <template #status="{ value }">
        <TLabel :color="value.status == 1 ? 'green' : 'red'">
          {{ value.status == 1 ? "Active" : "Inactive" }}
        </TLabel>
      </template>
      <template #action="{ value }">
        <div class="flex gap-2">
          <TButton classes="py-1 text-xs edit-item-btn">Edit</TButton>
          <TButton
            classes="py-1 text-xs delete-btn"
            color="red"
            :id="'delete-record-' + value.id"
          >
            Remove
          </TButton>
        </div>
      </template>
    </Index>
  </TCard>

  <TableLoading v-else />
</template>
