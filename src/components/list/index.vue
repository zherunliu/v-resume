<script lang="ts" setup>
import { ref, toRefs, watch, nextTick, type VNode } from 'vue'
import Base from '../base/index.vue'
import { type TPersonalExperience } from '../../schemas'
interface IProps {
  isChanging?: boolean
}

defineSlots<{
  header: () => VNode
}>()

const personalExperience = defineModel<TPersonalExperience>({ required: true })

const props = withDefaults(defineProps<IProps>(), {
  isChanging: false,
})

const { isChanging } = toRefs(props)
const newItem = ref('')

const adjustHeight = (e: Event) => {
  const target = e.target as HTMLTextAreaElement
  target.style.height = 'auto'
  target.style.height = target.scrollHeight + 'px'
}

const adjustAllHeights = async () => {
  // Wait for the DOM to update before adjusting heights
  await nextTick()
  document.querySelectorAll('textarea').forEach((textarea) => {
    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'
  })
}

watch(isChanging, (newValue) => {
  if (newValue) {
    adjustAllHeights()
  }
})
</script>

<template>
  <Base>
    <template v-slot:header>
      <input
        v-if="isChanging"
        v-model="personalExperience.header"
        placeholder="Personal Experience"
      />
      <div v-else>{{ personalExperience.header }}</div>
    </template>

    <template v-if="isChanging">
      <ul class="ml-5 list-disc">
        <li class="flex gap-5">
          <textarea
            class="flex-7/8 resize-none overflow-hidden"
            v-model="newItem"
            rows="1"
            placeholder="newItem"
            @input="adjustHeight"
          />
          <button class="flex-1/16" @click="(personalExperience.details.push(newItem), (newItem = ''))">add</button>
        </li>
        <li v-for="(item, idx) of personalExperience.details" :key="idx" class="flex gap-5">
          <textarea
            class="flex-7/8 resize-none overflow-hidden"
            v-model="personalExperience.details[idx]"
            rows="1"
            placeholder="skill"
            @input="adjustHeight"
          />
          <button class="flex-1/16" @click="personalExperience.details.splice(idx, 1)">remove</button>
        </li>
      </ul>
    </template>
    <template v-else>
      <ul class="ml-5 list-disc">
        <li v-for="(item, idx) of personalExperience.details" :key="idx">{{ item }}</li>
      </ul>
    </template>
  </Base>
</template>
