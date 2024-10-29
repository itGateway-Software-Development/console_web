<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Index from "@/modules/serverManagement/servers/components/Index.vue";
import {
  serverTypeService,
  authService,
} from "@/app/service/httpService/httpServiceProvider";
import { ServerData } from "../types/ServersType";
import TableLoading from "@/modules/shared/TableLoading.vue";
import { headerItems } from "../utils";

const loading = ref(true);
const serverTypes = ref<ServerData[]>([]);
const getServers = async () => {
  const authUser = authService.getUser();
  const res = await serverTypeService.getServerTypes(authUser.token);
  serverTypes.value = res.data.serverTypes;
  loading.value = false;
};

const isAllSelect = ref(false);

const onSelectAll = () => {
  isAllSelect.value = !isAllSelect.value;
  serverTypes.value = serverTypes.value.map((item) => {
    return {
      ...item,
      checked: isAllSelect.value,
    };
  });
};

const handleSubmitSuccess = async () => {
  loading.value = true;
  await getServers(); 
};

onMounted( () => {
     getServers();
});
</script>
<template>
  <PageHeader title="Servers" :items="['Server Management', 'Servers']" />
  <TCard class="overflow-x-auto" v-if="!loading">
    <Index
      id="location-table"
      :items="serverTypes"
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
