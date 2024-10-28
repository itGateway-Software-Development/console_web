<script lang="ts" setup>
import { onMounted } from 'vue';
import { authService } from '@/app/service/httpService/httpServiceProvider';

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
</script>
<template>
    <h1 class="text-center mt-7 text-xxl ">Welcome to itGateway Cloud</h1>
</template>
