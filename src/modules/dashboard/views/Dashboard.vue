<script lang="ts" setup>
import { onMounted } from 'vue';
import { authService } from '@/app/service/httpService/httpServiceProvider';
import {  Monitor, Server, Box, Database, ArrowRight } from "lucide-vue-next";

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
    value: "Databases",
    title: "No resource to display"
  },
  {
    iconColorClass: "text-green-500 bg-green-100 dark:bg-green-500/20",
    iconComponent: Box,
    value: "Kubernetes",
    title: "No resource to display"
  },
  {
    iconColorClass: "text-red-500 bg-red-100 dark:bg-red-500/20",
    iconComponent: Database,
    value: "Virtual Private Cloud",
    title: "No resource to display"
  },
  {
    iconColorClass: "text-green-500 bg-green-100 dark:bg-green-500/20",
    iconComponent: Box,
    value: "Elastic Block Storage",
    title: "No resource to display"
  },
  {
    iconColorClass: "text-red-500 bg-red-100 dark:bg-red-500/20",
    iconComponent: Database,
    value: "Elastic Object Storage",
    title: "No resource to display"
  }
];
</script>
<template>
    <!-- <h1 class="text-center mt-7 text-xxl mb-10 text-default-500">Welcome to itGateway Cloud</h1> -->
    <div class="grid grid-cols-12 gap-0 2xl:gap-3 px-20 mt-10">
        <div class="col-span-12 xl:col-span-8 ">
            <div class="relative grid grid-cols-8 gap-6">
                <TCard v-for="(card, index) in cards" :key="index" class="col-span-12 md:col-span-4 mb-0 shadow py-5">
                    <div class="text-center">
                        <!-- <div :class="['flex items-center justify-center mx-auto rounded-full size-14', card.iconColorClass]">
                            <component :is="card.iconComponent" />
                        </div> -->
                        <p class="mt-4 mb-2 text-xl lg:text-2xl font-bold text-default-500">
                            <!-- <TCountTo :endVal="card.value" :prefix="card.prefix" :suffix="card.suffix" :decimals="card.decimals" /> -->
                            {{ card.value }}
                        </p>
                        <p class="text-slate-500 dark:text-zink-200">{{ card.title }}</p>
                    </div>
                </TCard>
            </div>
        </div>

        <div class="col-span-12 xl:col-span-4 px-0 xl:px-10 mt-14 xl:mt-0">
            <TCard class="shadow px-7 xl:px-0 2xl:px-7">
                <p class="text-default-500 text-lg font-bold mb-5">Billing</p>
                <div class="flex flex-col gap-1 mb-5">
                    <p class="text-slate-200 dark:text-zink-100">Current Month Costs</p>
                    <p class="text-lime-600 font-bold text-xl">$ 0.00</p>
                </div>

                <div class="flex flex-col gap-1">
                    <p class="text-slate-200 dark:text-zink-100">Estimate Month End Costs</p>
                    <p class="text-lime-600 font-bold text-xl">$ 0.00</p>
                </div>

                <div class="flex flex-col gap-1 mt-20">
                    <RouterLink to="#" class="text-amber-400 font-bold  2xl:text-lg flex items-center gap-1">
                        Billing and Cost Management
                        <ArrowRight />
                    </RouterLink>
                </div>
            </TCard>

            <TCard class="shadow py-10 px-7 xl:px-0 2xl:px-7 mt-10">
                <p class="text-default-500 text-lg font-bold mb-5">Data Transfer</p>
            </TCard>
        </div>
    </div>
</template>
