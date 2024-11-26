<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Index from "@/modules/servers/components/Index.vue";
import {
  locationService,
  authService,
} from "@/app/service/httpService/httpServiceProvider";
import { LocationType } from "@/modules/serverManagement/location/types/LocationType";
import TableLoading from "@/modules/shared/TableLoading.vue";
import { headerItems } from "@/modules/servers/utils";
import axios from "axios";
import api from "@/app/service/api/url";

const loading = ref(true);
const servers = ref<LocationType[]>([]);
const getServers = async () => {
  const authUser = authService.getUser();
  const response = await axios.get(api.get_deploy_servers, api.headers(authUser.token));

  servers.value = response.data.deploy_servers;
  loading.value = false;
};

const isAllSelect = ref(false);

const onSelectAll = () => {
  isAllSelect.value = !isAllSelect.value;
  servers.value = servers.value.map((item) => {
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
      :items="servers"
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

      <template #server_status="{ value }">
        <TLabel :color="value.server_status == 'Running' ? 'green' : 'red'">
          {{ value.server_status }}
        </TLabel>
      </template>
      <template #action="{ value }">
        <div class="flex gap-2">
          <TButton classes="py-1 text-xs edit-item-btn">Reboot</TButton>
          <TButton
            classes="py-1 text-xs delete-btn"
            color="red"
            :id="'delete-record-' + value.id"
          >
            ShutDown
          </TButton>
        </div>
      </template>
    </Index>
  </TCard>

  <TableLoading v-else />
</template>
