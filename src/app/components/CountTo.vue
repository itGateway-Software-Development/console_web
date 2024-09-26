<script lang="ts" setup>
import { CountTo } from "vue3-count-to";
// const props =
defineProps({
  endVal: {
    type: Number,
    default: 100
  },
  duration: {
    type: Number,
    default: 100000
    // default: 600000
  },
  suffix: {
    type: String,
    default: ""
  },
  prefix: {
    type: String,
    default: ""
  },
  decimals: {
    type: Number,
    default: 0
  }
});
</script>
<template>
  <CountTo
    :start-val="endVal"
    :endVal="0"
    :duration="duration"
    :suffix="suffix"
    :prefix="prefix"
    :decimals="decimals"
  />
</template>
