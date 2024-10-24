<script lang="ts" setup>
import { LAYOUT_TYPES } from "@/layouts/types.ts";
import { LoginForm} from '@/modules/auth/components';

defineProps({
  layout: {
    type: String,
    default: LAYOUT_TYPES.BASIC
  }
});
</script>
<template>
  <LoginForm :layout="layout" />
</template>
