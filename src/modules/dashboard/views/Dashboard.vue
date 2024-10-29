<script lang="ts" setup>
import { onMounted } from 'vue';
import { authService } from '@/app/service/httpService/httpServiceProvider';
import {  Monitor, Server, Box, Database } from "lucide-vue-next";

const authUser = authService.getUser();
onMounted(async () => {
    if(authUser && authUser.token) {
        const response = await authService.isStillAuthenticated({
        token: authUser.token, email: authUser.email});
        
        if(response.data.message == "Unauthenticated.") {
            authService.removeUser();
            window.location.href = '/login';
        }  
    }
})
const cards = [
  {
    iconColorClass: "bg-custom-100 text-custom-500 dark:bg-custom-500/20",
    iconComponent: Monitor,
    value: "Virtual Machine",
    prefix: "$",
    suffix: "k",
    decimals: 2,
    title: "No resource to display"
  },
  {
    iconColorClass: "text-purple-500 bg-purple-100 dark:bg-purple-500/20",
    iconComponent: Server,
    value: "Bare Metal Server",
    title: "No resource to display"
  },
  {
    iconColorClass: "text-green-500 bg-green-100 dark:bg-green-500/20",
    iconComponent: Box,
    value: "Container",
    title: "No resource to display"
  },
  {
    iconColorClass: "text-red-500 bg-red-100 dark:bg-red-500/20",
    iconComponent: Database,
    value: "Database",
    title: "No resource to display"
  }
];
</script>
<template>
    <h1 class="text-center mt-7 text-xxl mb-10 text-default-500">Welcome to itGateway Cloud</h1>
    <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12 md:col-span-8 ">
            <div class="relative grid grid-cols-8 gap-3">
                <TCard v-for="(card, index) in cards" :key="index" class="col-span-12 md:col-span-4 mb-0 shadow">
                    <div class="text-center">
                        <div :class="['flex items-center justify-center mx-auto rounded-full size-14', card.iconColorClass]">
                            <component :is="card.iconComponent" />
                        </div>
                        <h5 class="mt-4 mb-2">
                            <!-- <TCountTo :endVal="card.value" :prefix="card.prefix" :suffix="card.suffix" :decimals="card.decimals" /> -->
                            {{ card.value }}
                        </h5>
                        <p class="text-slate-500 dark:text-zink-200">{{ card.title }}</p>
                    </div>
                </TCard>
            </div>
        </div>

        <div class="col-span-12 md:col-span-4 px-10">
            <TCard class="shadow">
                <p class="text-default-500 text-lg font-bold mb-5">Billing</p>
                <div class="flex flex-col gap-1 mb-5">
                    <p class="text-slate-200 dark:text-zink-100">Current Month Costs</p>
                    <p class="text-lime-600 font-bold text-lg">$ 0.00</p>
                </div>

                <div class="flex flex-col gap-1">
                    <p class="text-slate-200 dark:text-zink-100">Estimate Month End Costs</p>
                    <p class="text-lime-600 font-bold text-lg">$ 0.00</p>
                </div>
            </TCard>
        </div>
    </div>
</template>
