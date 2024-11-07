<script lang="ts" setup>
import { LayoutGrid, Star } from "lucide-vue-next";
import {cloudServices} from "./services"
import { onMounted, onUnmounted, ref } from "vue";

const currentValue = ref<String>("Most Demand")
const service = ref(cloudServices.find(service => service.title == currentValue.value));
const isMenuOpen = ref(false);
const menuRef = ref<HTMLElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(e.target as Node)) {
    isMenuOpen.value = false;
  }
}

const onSelectService = (title:String) => {
  currentValue.value = title;
  service.value = cloudServices.find(service => service.title == title);
}

onMounted(() => {
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
        class="inline-block p-0 transition-all duration-200 ease-linear bg-topbar rounded-full text-topbar-item dropdown-toggle btn hover:bg-topbar-item-bg-hover group-data-[topbar=dark]:text-topbar-item-dark group-data-[topbar=dark]:bg-topbar-dark group-data-[topbar=dark]:hover:bg-topbar-item-bg-hover-dark group-data-[topbar=dark]:hover:text-default-500 group-data-[topbar=brand]:bg-topbar-brand group-data-[topbar=brand]:hover:bg-topbar-item-bg-hover-brand group-data-[topbar=brand]:hover:text-default-500 group-data-[topbar=dark]:dark:bg-zink-700 group-data-[topbar=dark]:dark:hover:bg-zink-600 group-data-[topbar=brand]:text-topbar-item-brand group-data-[topbar=dark]:dark:hover:text-default-500 group-data-[topbar=dark]:dark:text-zink-200 hover:text-default-500"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        @click="isMenuOpen = !isMenuOpen"
      >
        <div ref="menuRef" :class="`hover:text-default-500 flex gap-1 items-center font-medium ${isMenuOpen ? 'text-default-500' : 'text-zink-200'}`">
          <LayoutGrid class="size-5" /> 
          <span>Services</span>
        </div>
      </button>

    </div>
    <template #content>
      <div class="lg:w-[800px] min-h-[700px] p-4 pt-10">
        <div class="grid grid-cols-3">
          <div class="col-span-1">
            <div :class="`flex items-center gap-2 border-b border-zink-200 pb-3 me-5 ${currentValue == 'Most Demand' ? 'text-default-500' : ''}`" @click="onSelectService('Most Demand')">
              <Star />
              <span>Most Demand</span>
            </div>
            <div class="mt-5">
              <div class="mb-3" v-for="(service, index) in cloudServices" :key="index">
                <div :class="`flex items-center gap-2 ${currentValue == service.title ? 'text-default-500' : ''}`" v-if="service.title != 'Most Demand'" @click="onSelectService(service.title)">
                  <img class="w-6 h-6" :src="service?.image" alt="">
                  <p>{{service?.title}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-2 border-l">
            <div class="flex items-center gap-2 ps-5">
              <img class="w-10 h-10" :src="service?.image" alt="">
              <p class="text-2xl font-bold ">{{service?.title}}</p>
            </div>
            <div class="flex flex-col gap-5 py-5 ps-[68px] pe-10">
              <div v-for="(service, index) in service?.availableServices" :key="index" class="hover:text-default-500" >
                <p class="text-16 font-bold ">{{service.title}}</p>
                <p class="text-slate-400 text-sm">{{service.subTitle}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </TMenu>
</template>
