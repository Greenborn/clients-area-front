<template>
  <div class="row">
    <div class="col" v-html="parametros.texto">
    </div>
  </div>

  <div class="row justify-content-center">
    <div class="col-auto">
        <Button v-for="(btn) in parametros.botones" :key="btn"
          :label="btn.label" :icon="btn.icon" @click="btn.onClick" :class="btn.class" :autofocus="btn.autofocus" />
    </div>
  </div>
  
</template>

<script setup>
  import { AppStore } from "../../stores/app";

  const props = defineProps(['parametros'])
  const storeApp = AppStore()
</script>

<style scoped>
</style>