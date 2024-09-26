<script setup>
    const props = defineProps({
        text: String
    })
</script>

<template>
    <button class="default-btn">
        {{props.text}}
    </button>
</template>

<style scoped>
.default-btn{
    border: 2px solid #e25a00 !important;
    background: linear-gradient(99deg,#EC6316 3%,#c75b13 90%) !important;
    color: #ededed;
    border-radius: 0px 20px 0 20px;
    font-size: 15px;
    letter-spacing: 0.03rem;
    transition: .5s ease;
    font-weight: 550;
    position: relative;
    z-index: 1;
    overflow: hidden;
    padding: 5px 5px;
    width: 100%;
  } 
  
  .default-btn:hover {
    border: 2px solid #EC6316 !important;
    color: #ededed !important;
    transform: translateY(-5px);
  }
  
  .default-btn::after {
    content: '';
    position: absolute;
    /* background: linear-gradient(to right,#EC6316, #853a0f); */
    background: linear-gradient(99deg,#EC6316 3%,#ff6600 90%);
    z-index: -1;
    padding: 0.25em 0.5em;
    display: block;
    transition: all 0.5s;
    left: -20%;
    right: -20%;
    top: 0;
    bottom: 0;
    transform: skewX(-45deg) scale(0, 1);
  }
  
  .default-btn:hover::after {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: all .8s;
    transform: skewX(-45deg) scale(2, 1);
  }
</style>