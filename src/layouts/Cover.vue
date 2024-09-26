<script lang="ts" setup>
import { onMounted } from "vue";
onMounted(() => {
  // document.body.setAttribute(
  //     "class",
  //     "flex items-center justify-center min-h-screen py-16 bg-cover bg-auth-pattern dark:bg-auth-pattern-dark dark:text-zink-100 font-public"
  //   );
});
</script>
<template>
  <div class="flex items-center justify-center min-h-screen py-16 bg-cover bg-auth-pattern dark:bg-auth-pattern-dark dark:text-zink-100 font-public">
    <div
    class="mb-0 border-none lg:w-[500px] max-h-[50%] card bg-white/70 shadow-none dark:bg-zink-500/70"
  >
    <div class="!px-10 !py-12 card-body">
      <a href="index">
        <img
          src="@/assets/images/light-logo.png"
          alt=""
          class="hidden h-12 mx-auto dark:block"
        />
        <img
          src="@/assets/images/dark-logo.png"
          alt=""
          class="block h-12 mx-auto dark:hidden"
        />
      </a>
      <div class="mt-8">
        <router-view />
      </div>
    </div>
  </div>
  </div>
</template>
