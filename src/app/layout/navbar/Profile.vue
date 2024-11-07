<script lang="ts" setup>
import { User2, MessagesSquare, Gem, LogOut } from "lucide-vue-next";
import { authService } from "@/app/service/httpService/httpServiceProvider.ts";
import { onMounted, onUnmounted, ref } from "vue";
const onSignOut = () => {
  authService.removeUser();
};

const authUser = ref();
const isMenuOpen = ref(false);
const menuRef = ref<HTMLElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(e.target as Node)) {
    isMenuOpen.value = false;
  }
}

onMounted(() => {
  authUser.value = authService.getUser();
  document.addEventListener("click", handleClickOutside);
})

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
})
</script>
<template>
  <TMenu>
    <div class="relative flex items-center dropdown h-header">
      <button
        type="button"
        class="inline-block p-0 transition-all duration-200 ease-linear bg-topbar rounded-full text-topbar-item dropdown-toggle btn hover:bg-topbar-item-bg-hover hover:text-topbar-item-hover group-data-[topbar=dark]:text-topbar-item-dark group-data-[topbar=dark]:bg-topbar-dark group-data-[topbar=dark]:hover:bg-topbar-item-bg-hover-dark group-data-[topbar=dark]:hover:text-topbar-item-hover-dark group-data-[topbar=brand]:bg-topbar-brand group-data-[topbar=brand]:hover:bg-topbar-item-bg-hover-brand group-data-[topbar=brand]:hover:text-topbar-item-hover-brand group-data-[topbar=dark]:dark:bg-zink-700 group-data-[topbar=brand]:text-topbar-item-brand group-data-[topbar=dark]:dark:hover:text-zink-50 group-data-[topbar=dark]:dark:text-zink-200"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        @click="isMenuOpen = !isMenuOpen"
      >
        <div ref="menuRef" :class="`hover:text-default-500 flex items-center font-medium ${isMenuOpen ? 'text-default-500' : 'text-zink-200'}`">
          {{ authUser ? authUser.name : '' }}
          <i class="ri-arrow-down-s-fill text-2xl"></i>
        </div>
      </button>
    </div>
    <template #content>
      <div class="min-w-[14rem] p-4">
        <h6 class="mb-2 text-sm font-normal text-slate-500 dark:text-zink-300">
          Welcome to itGateway Cloud
        </h6>
        <a href="#!" class="flex gap-3 mb-3">
          <div class="relative inline-block shrink-0">
            <div class="rounded">
              <img :src="`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${authUser ? authUser.name : ''}`" alt="" class="size-12 rounded-full" />
            </div>
            <span
              class="-top-0 ltr:right-1 rtl:-left-1 absolute w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full dark:border-zink-600"
            ></span>
          </div>
          <div>
            <h6 class="mb-1 text-15">{{authUser ? authUser.name : ''}}</h6>
            <p class="text-slate-500 dark:text-zink-300">User</p>
          </div>
        </a>
        <ul>
          <li>
            <router-link to="/user-profile"
              class="block ltr:pr-4 rtl:pl-4 py-1.5 text-base font-medium transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:text-custom-500 focus:text-custom-500 dark:text-zink-200 dark:hover:text-custom-500 dark:focus:text-custom-500"
            >
              <User2 class="inline-block size-4 ltr:mr-2 rtl:ml-2" /> Profile
            </router-link>
          </li>
          <!-- <li>
            <router-link
              class="block ltr:pr-4 rtl:pl-4 py-1.5 text-base font-medium transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:text-custom-500 focus:text-custom-500 dark:text-zink-200 dark:hover:text-custom-500 dark:focus:text-custom-500"
              to="#"
            >
              <Mail class="inline-block size-4 ltr:mr-2 rtl:ml-2" />Inbox
              <span
                class="inline-flex items-center justify-center size-5 ltr:ml-2 rtl:mr-2 text-[11px] font-medium border rounded-full text-white bg-red-500 border-red-500"
              >
                15
              </span>
            </router-link>
          </li>
          <li>
            <router-link
              class="block ltr:pr-4 rtl:pl-4 py-1.5 text-base font-medium transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:text-custom-500 focus:text-custom-500 dark:text-zink-200 dark:hover:text-custom-500 dark:focus:text-custom-500"
              to="#"
            >
              <MessagesSquare class="inline-block size-4 ltr:mr-2 rtl:ml-2" />
              Chat
            </router-link>
          </li> -->
         
          <li class="pt-2 mt-2 border-t border-slate-200 dark:border-zink-500">
            <a
              @click="onSignOut"
              class="block ltr:pr-4 rtl:pl-4 py-1.5 text-base font-medium transition-all duration-200 ease-linear text-slate-600 dropdown-item hover:text-custom-500 focus:text-custom-500 dark:text-zink-200 dark:hover:text-custom-500 dark:focus:text-custom-500"
              href="#!"
            >
              <LogOut class="inline-block size-4 ltr:mr-2 rtl:ml-2" />Sign Out
            </a>
          </li>
        </ul>
      </div>
    </template>
  </TMenu>
</template>
