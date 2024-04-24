<script setup lang="ts">
import Input from './ui-input.vue'
import { computed, reactive, ref } from 'vue'
import { defaultOptions } from '../../../src/utils/default-options'
import { TPalitraColor, TPalitraInput, TScaleOptions } from '../../../src'
import PalitraOptions from './palitra-options.vue'
import PalitraColors from './palitra-colors.vue'
import UiCollapse from './ui-collapse.vue'

const opts = reactive<Exclude<TPalitraColor<TScaleOptions>, string>>({
  ...JSON.parse(JSON.stringify(defaultOptions)),
})

opts.luminance.middle = 0.6

const colors = ref([
  { name: 'brand', color: '#735cbd', opts: {} },
  { name: 'accent', color: '#1c3ab0', opts: {} },
  { name: 'neutral', color: '#466b87', opts: {} },
  { name: 'positive', color: '#2b8c59', opts: {} },
  { name: 'warning', color: '#d49217', opts: {} },
  { name: 'negative', color: '#ba2935', opts: {} },
  { name: 'grey', color: '#868b96', opts: {} },
])

const palitraInput = computed<TPalitraInput>(() => {
  const c: TPalitraInput = {}
  for (const color of colors.value) {
    c[color.name] = {
      ...color.opts,
      color: color.color,
    }
  }
  return c
})
</script>

<template>
  <div class="flex flex-col gap-2 pt-6">
    <UiCollapse label="Colors">
      <div class="py-4 flex flex-wrap gap-4">
        <Input v-for="c of colors" v-model="c.color" :label="c.name" class="w-100px">
          <template #append>
            <ColorPicker
              tabindex="0"
              v-model:pureColor="c.color"
              use-type="pure"
              pickerType="chrome"
              format="hex"
              shape="circle"
            />
          </template>
        </Input>
      </div>
    </UiCollapse>

    <UiCollapse label="Palitra base config">
      <div class="py-4 flex flex-col gap-10 md:flex-row">
        <PalitraOptions v-model="opts" />
      </div>
    </UiCollapse>

    <div class="py-4">
      <PalitraColors :default-opts="opts" :colors="palitraInput" />
    </div>
  </div>
</template>
