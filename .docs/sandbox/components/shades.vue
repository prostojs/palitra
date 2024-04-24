<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { scaleColor, TScaleOptionsInput } from '../../../src/index'
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from 'radix-vue'

const modelValue = defineModel<string>()

const opts = defineModel<TScaleOptionsInput>('opts')
const dark = ref('')
const light = ref('')
const light2 = ref('')
const dark2 = ref('')

const shades = computed(() => {
  if (modelValue.value) {
    const result = scaleColor(modelValue.value, opts.value).map(c => {
      const pbr = c.pbr
      return {
        c: c.color,
        pbr,
      }
    })
    light.value = (result.find(({ pbr }) => pbr > 0.92) || { c: '#efefef' }).c
    light2.value = (result.find(({ pbr }) => pbr > 0.88) || { c: '#eaeaea' }).c
    dark.value = (result.reverse().find(({ pbr }) => pbr < 0.35) || { c: '#333' }).c
    dark2.value = (result.find(({ pbr }) => pbr < 0.5) || { c: '#555' }).c
    return result.map(s => ({
      ...s,
      text: s.pbr > 0.72 ? dark.value : light.value,
    }))
  }
  return []
})

let interval: number

const darkMode = ref(false)

onMounted(() => {
  interval = setInterval(() => {
    darkMode.value = !!document.querySelector('html')?.classList.contains('dark')
  }, 200)
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>

<template>
  <div
    class="flex flex-col flex-wrap py-4 gap-1 items-center"
    :class="{
      'max-h-470px': shades.length < 21,
      'max-h-940px': shades.length < 41 && shades.length > 20,
    }"
  >
    <div v-for="s of shades" class="flex items-center gap-4">
      <TooltipProvider>
        <TooltipRoot>
          <TooltipTrigger as-child>
            <div
              class="w-100px h-40px relative flex items-center justify-center rounded shadow-lg"
              :style="{
                'background-color': s.c,
                'color': s.text,
              }"
            >
              <span>
                {{ s.c }}
              </span>
            </div>
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent
              side="left"
              :style="{
                'background-color': darkMode ? dark2 : light2,
                'color': darkMode ? light2 : dark2,
                'border': `1px solid ${darkMode ? light2 : dark2}`,
              }"
              class="shadow-xl rounded w-170px pa-3 px-5 flex flex-col items-end"
              :side-offset="5"
            >
              <div class="text-bold text-xl mb-2 text-slate12">{{ (s.pbr * 100).toFixed() }}%</div>
              <span class="text-xs">Perceived Brightness</span>
              <TooltipArrow
                :style="{
                  fill: darkMode ? light2 : dark2,
                }"
                :width="8"
              />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
      </TooltipProvider>
    </div>
  </div>
</template>
