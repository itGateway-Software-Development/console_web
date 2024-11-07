<script lang="ts" setup>
import { authService } from "@/app/service/httpService/httpServiceProvider.ts";
import { onMounted, onUnmounted, ref } from "vue";

const authUser = ref();

const isMenuOpen = ref(false);
const menuRef = ref<HTMLElement | null>(null);

const handleClickOutside = (e: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(e.target as Node)) {
    isMenuOpen.value = false;
  }
};

onMounted(() => {
  authUser.value = authService.getUser();
  document.addEventListener("click", handleClickOutside);
})

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
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
        @click="isMenuOpen = !isMenuOpen"
      >
        <div class=" flex items-center">
          <i ref="menuRef" :class="`ri-question-line text-[22px] ${isMenuOpen ? 'text-default-500' : 'text-zink-200'} hover:text-default-500`"></i>
        </div>
      </button>
    </div>
    <template #content>
      <div class="min-w-[12rem] p-4">
        <ul>
          <li>
            <router-link to="/#"
              class="block ltr:pr-4 rtl:pl-4 py-1.5 text-base font-medium transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:text-custom-500 focus:text-custom-500 dark:text-zink-200 dark:hover:text-custom-500 dark:focus:text-custom-500"
            >
              Support Center
            </router-link>
          </li>
          
        </ul>
      </div>
    </template>
  </TMenu>
</template>
