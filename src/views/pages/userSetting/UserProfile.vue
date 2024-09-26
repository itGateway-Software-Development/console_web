<script lang="ts" setup>
import { User2, LockKeyhole } from "lucide-vue-next";
import { ref } from "vue";
import { authService } from "@/app/service/httpService/httpServiceProvider.ts";
import ProfileUpdate from "@/app/pages/UserSetting/ProfileUpdate.vue";
import ChangePassword from "@/app/pages/UserSetting/ChangePassword.vue";

const authUser = authService.getUser();
const current_tab = ref('profile')

</script>
<template>
    <div class="p-3">
        <PageHeader title="User Profile" :items="['Profile', 'Update Profile']" />

        <div class="grid grid-cols-5 gap-5">
            <div class="col-span-1">
                <div class="flex flex-col border rounded-md dark:border-zink-500 py-7 card">
                    <a
                      href="#!"
                      class="block px-3.5 py-2.5 transition  dark:border-zink-500 hover:bg-slate-100 dark:hover:bg-zink-600"
                      :class="{
                        'pointer-events-none bg-default-tr text-custom-50': current_tab == 'profile'
                      }"
                      @click="current_tab = 'profile'"
                      > <User2 class="inline-block size-4 ltr:mr-2 rtl:ml-2" /> <span class="hidden lg:inline-block">Profile Setting</span></a
                    >
                    <a
                      href="#!"
                      class="block px-3.5 py-2.5 transition  dark:border-zink-500 hover:bg-slate-100 dark:hover:bg-zink-600"
                      :class="{
                        'pointer-events-none bg-default-tr text-custom-50': current_tab == 'password'
                      }"
                      @click="current_tab = 'password'"
                      > <LockKeyhole class="inline-block size-4 ltr:mr-2 rtl:ml-2" /> <span class="hidden lg:inline-block">Password</span></a
                    >
                  </div>
            </div>
            <div class="col-span-4">
              <div v-if="current_tab == 'profile'">
                <ProfileUpdate :authUser="authUser"  />
              </div>

              <div v-else>
                <ChangePassword :authUser="authUser"/>
              </div>
            </div>
        </div>
    </div>
</template>
