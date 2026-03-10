<script lang="ts" setup>
import { ref, toRefs, type VNode } from 'vue'
import Base from '../base/index.vue'

interface IProps {
  isChanging?: boolean
}

defineSlots<{
  header: () => VNode
}>()

const itemList = defineModel<string[]>({ required: true })

const props = withDefaults(defineProps<IProps>(), {
  isChanging: false,
})

const { isChanging } = toRefs(props)
const newItem = ref('')
</script>

<template>
  <Base>
    <template v-slot:header>
      <slot name="header" />
    </template>

    <template v-if="isChanging">
      <ul class="ml-5 list-disc">
        <li class="flex gap-5">
          <textarea class="flex-7/8" v-model="newItem" placeholder="newItem" />
          <button class="flex-1/16" @click="itemList.push(newItem)">add</button>
        </li>
        <li v-for="(item, idx) of itemList" :key="idx" class="flex gap-5">
          <!-- <textarea class="flex-7/8" v-model="item" placeholder="skill" /> -->
          <textarea class="flex-7/8" v-model="itemList[idx]" placeholder="skill" />
          <button class="flex-1/16" @click="itemList.splice(idx, 1)">remove</button>
        </li>
      </ul>
    </template>
    <template v-else>
      <ul class="ml-5 list-disc">
        <li v-for="(item, idx) of itemList" :key="idx">{{ item }}</li>
      </ul>
    </template>
  </Base>
</template>
