<script lang="ts" setup>
import type { VNode } from 'vue'

defineSlots<{
  header: () => VNode
  default: () => VNode
}>()
</script>
<template>
  <div class="mx-auto mt-2 w-[80vw]">
    <div class="font-bold">
      <slot name="header" />
    </div>
    <hr class="my-2" />
    <div>
      <slot />
    </div>
  </div>
</template>
