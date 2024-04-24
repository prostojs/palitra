<script setup lang="ts">
import Input from './ui-input.vue'
import Range from './ui-range.vue'
import Slider from './ui-slider.vue'
import Tabs from './ui-tabs.vue'
import Tab from './ui-tab.vue'
import Checkbox from './ui-checkbox.vue'
import { TPalitraColor, TScaleOptions } from '../../../src'
import { defaultOptions } from '../../../src/utils/default-options'

defineProps<{
  useColor?: boolean
  useQuantity?: boolean
}>()

const modelValue = defineModel<Exclude<TPalitraColor<TScaleOptions>, string>>({
  default: () => ({ color: 'blue', ...JSON.parse(JSON.stringify(defaultOptions)) }),
})
</script>

<template>
  <div class="flex flex-col flex-1">
    <div
      class="grid grid-cols-2 gap-8 max-w-md mb-6 max-md:grid-cols-none"
      v-if="useQuantity || useColor"
    >
      <Input v-model="modelValue.color" label="Input Color" v-if="useColor">
        <template #append>
          <ColorPicker
            tabindex="0"
            v-model:pureColor="modelValue.color"
            use-type="pure"
            pickerType="chrome"
            format="hex"
            shape="circle"
          />
        </template>
      </Input>
      <Input v-if="useQuantity" label="Shades Quantity" v-model="modelValue.count" />
    </div>

    <Tabs class="w-full max-w-md" default-value="t1">
      <Tab label="Brightness" value="t1" class="p-6 py-8">
        <div class="flex flex-col gap-8">
          <div class="grid grid-cols-2 gap-8 max-w-md max-md:grid-cols-none">
            <Checkbox label="Preserve Input Color" v-model="modelValue.preserveInputColor" />
            <Checkbox label="Define Middle Shade" v-model="modelValue.luminance.useMiddle" />
          </div>

          <Range
            :label="`Dark | ${modelValue.luminance.useMiddle ? 'Middle | ' : ''}Light`"
            v-model:from="modelValue.luminance.dark"
            v-model:to="modelValue.luminance.light"
            v-model:middle="modelValue.luminance.middle"
            :use-middle="modelValue.luminance.useMiddle"
            :min="0"
            :max="1"
            :step="0.01"
            :decimals="2"
          />
          <Slider
            label="Slope from Light"
            v-model="modelValue.luminance.slopes.fromLight"
            :min="0"
            :max="1"
            :step="0.01"
            :decimals="2"
          />
          <Slider
            label="Slope from Dark"
            v-model="modelValue.luminance.slopes.fromDark"
            :min="0"
            :max="1"
            :step="0.01"
            :decimals="2"
          />
        </div>
      </Tab>
      <Tab label="Saturate" value="t2" class="p-6 py-8">
        <div class="flex flex-col gap-8">
          <Slider
            style="--vp-c-text-1: #248fca; --vp-c-brand-2: #248fca"
            label="Light end"
            v-model="modelValue.saturate.light"
            :min="-0.2"
            :max="1"
            :step="0.01"
            :decimals="2"
          />
          <Slider
            style="--vp-c-text-1: #248fca; --vp-c-brand-2: #248fca"
            label="Dark end"
            v-model="modelValue.saturate.dark"
            :min="-0.2"
            :max="1"
            :step="0.01"
            :decimals="2"
          />
          <Slider
            label="Slope from Light"
            v-model="modelValue.saturate.slopes.fromLight"
            :min="0"
            :max="1"
            :step="0.01"
            :decimals="2"
          />
          <Slider
            label="Slope from Dark"
            v-model="modelValue.saturate.slopes.fromDark"
            :min="0"
            :max="1"
            :step="0.01"
            :decimals="2"
          />
        </div>
      </Tab>
      <Tab label="Vivid" value="t3" class="p-6 py-8">
        <div class="flex flex-col gap-8">
          <Slider
            style="--vp-c-text-1: #c28405; --vp-c-brand-2: #c28405"
            label="Light end"
            v-model="modelValue.vivid.light"
            :min="0"
            :max="1"
            :step="0.01"
            :decimals="2"
          />
          <Slider
            style="--vp-c-text-1: #c28405; --vp-c-brand-2: #c28405"
            label="Dark end"
            v-model="modelValue.vivid.dark"
            :min="0"
            :max="1"
            :step="0.01"
            :decimals="2"
          />
          <Slider
            label="Slope from Light"
            v-model="modelValue.vivid.slopes.fromLight"
            :min="0"
            :max="1"
            :step="0.01"
            :decimals="2"
          />
          <Slider
            label="Slope from Dark"
            v-model="modelValue.vivid.slopes.fromDark"
            :min="0"
            :max="1"
            :step="0.01"
            :decimals="2"
          />
        </div>
      </Tab>
    </Tabs>
  </div>
</template>

<style>
.vc-color-wrap {
  margin-right: 0 !important;
  border-color: var(--vp-c-border) !important;
}
</style>
