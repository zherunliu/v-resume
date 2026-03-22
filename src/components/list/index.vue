<script lang="ts" setup>
import { toRefs, watch, nextTick } from 'vue'
import Base from '../base/index.vue'
import { type TPersonalExperience } from '../../schemas'
interface IProps {
  isChanging?: boolean
}

const personalExperienceList = defineModel<TPersonalExperience[]>({ required: true })

const props = withDefaults(defineProps<IProps>(), {
  isChanging: false,
})

const { isChanging } = toRefs(props)

const moveUpList = (index: number) => {
  if (index === 0) return
  const temp = personalExperienceList.value[index - 1]
  personalExperienceList.value[index - 1] = personalExperienceList.value[index]
  personalExperienceList.value[index] = temp
  adjustAllHeights()
}

const moveUpItem = (listIndex: number, itemIndex: number) => {
  if (itemIndex === 0) return
  const details = personalExperienceList.value[listIndex].details
  const temp = details[itemIndex - 1]
  details[itemIndex - 1] = details[itemIndex]
  details[itemIndex] = temp
  adjustAllHeights()
}

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

defineExpose({ adjustAllHeights })
</script>

<template>
  <template
    v-for="(personalExperience, itemIdex) in personalExperienceList"
    :key="personalExperience.header"
  >
    <Base>
      <template v-slot:header>
        <div v-if="isChanging" class="flex justify-between">
          <input v-model="personalExperience.header" placeholder="Personal Experience" />
          <div class="flex gap-5 justify-between">
            <button
              @click="
                (personalExperienceList.splice(itemIdex, 0, { header: '', details: [] }),
                adjustAllHeights())
              "
              class="w-20"
            >
              add
            </button>
            <button @click="moveUpList(itemIdex)" class="w-20">moveUp</button>
            <button
              @click="(personalExperienceList.splice(itemIdex, 1), adjustAllHeights())"
              class="w-20"
            >
              remove
            </button>
          </div>
        </div>

        <div v-else>{{ personalExperience.header }}</div>
      </template>

      <template v-if="isChanging">
        <ul class="ml-5 list-disc">
          <li v-for="(item, idx) of personalExperience.details" :key="idx" class="flex gap-5">
            <textarea
              class="resize-none overflow-hidden flex-1"
              v-model="personalExperience.details[idx]"
              rows="1"
              placeholder="skill"
              @input="adjustHeight"
            />
            <button
              @click="(personalExperience.details.splice(idx, 0, ''), adjustAllHeights())"
              class="w-20"
            >
              add
            </button>
            <button @click="moveUpItem(itemIdex, idx)" class="w-20">moveUp</button>
            <button
              class="w-20"
              @click="(personalExperience.details.splice(idx, 1), adjustAllHeights())"
            >
              remove
            </button>
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
</template>
