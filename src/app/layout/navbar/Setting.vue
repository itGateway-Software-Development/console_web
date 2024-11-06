<script lang="ts" setup>
import { User2, LogOut, SlidersHorizontal } from "lucide-vue-next";
import { authService } from "@/app/service/httpService/httpServiceProvider.ts";
import { onMounted, ref } from "vue";
import SiteMode from "@/app/layout/navbar/SiteMode.vue";
const onSignOut = () => {
  authService.removeUser();
};
const authUser = ref();

onMounted(() => {
  authUser.value = authService.getUser();
})
</script>
<template>
  <TMenu :extraTranslate="true">
    <div class="relative flex items-center dropdown h-header">
      <button
        type="button"
        class="inline-block p-0 transition-all duration-200 ease-linear bg-topbar rounded-full text-topbar-item dropdown-toggle btn hover:bg-topbar-item-bg-hover hover:text-topbar-item-hover group-data-[topbar=dark]:text-topbar-item-dark group-data-[topbar=dark]:bg-topbar-dark group-data-[topbar=dark]:hover:bg-topbar-item-bg-hover-dark group-data-[topbar=dark]:hover:text-topbar-item-hover-dark group-data-[topbar=brand]:bg-topbar-brand group-data-[topbar=brand]:hover:bg-topbar-item-bg-hover-brand group-data-[topbar=brand]:hover:text-topbar-item-hover-brand group-data-[topbar=dark]:dark:bg-zink-700 group-data-[topbar=brand]:text-topbar-item-brand group-data-[topbar=dark]:dark:hover:text-zink-50 group-data-[topbar=dark]:dark:text-zink-200"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
      >
        <div class="hover:text-default-500 flex items-center">
          <SlidersHorizontal class="size-4" />
        </div>
      </button>
    </div>
    <template #content>
      <div class="min-w-[14rem] p-4">
        <ul>
          <li>
            <SiteMode /> Click to switch mode
          </li>
        </ul>
      </div>
    </template>
  </TMenu>
</template>
