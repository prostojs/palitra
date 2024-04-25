<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue'
import { clamp } from '../../../src/utils/utils'

type Props = {
  min?: number
  max?: number
  step?: number
  label?: string
  decimals?: number
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  step: 1,
  decimals: 0,
})

const modelValue = defineModel<number>()
const safeValue = computed(() =>
  typeof modelValue.value === 'number' ? modelValue.value : props.min
)
const offset = computed(() =>
  round(((safeValue.value - props.min) / (props.max - props.min)) * 100)
)

function round(v: number) {
  return Math.round(v)
}

function change(k: number) {
  if (typeof modelValue.value !== 'number') {
    modelValue.value = safeValue.value
  }
  modelValue.value = clamp(modelValue.value + k * props.step, props.min, props.max)
}

let x = 0
let v = 0
const hold = ref(false)

function onMousedown(event: MouseEvent | TouchEvent) {
  if (event instanceof MouseEvent) {
    window.addEventListener('mouseup', onMouseup)
    window.addEventListener('mousemove', onMove)
  } else {
    window.addEventListener('touchend', onMouseup)
    window.addEventListener('touchmove', onMove)
  }
  hold.value = true
  if (event instanceof TouchEvent) {
    x = event.touches[0].clientX // Get the x coordinate of the first touch point
  } else {
    x = event.clientX // Get the x coordinate for mouse event
  }
  if (instance?.vnode.el) {
    const el = instance.vnode.el as HTMLSpanElement
    const { width, left } = el.getBoundingClientRect()
    const dif = (x - left) / width
    const change = dif * (props.max - props.min)
    // modelValue.value =
    v = Math.round(clamp(change + props.min, props.min, props.max) / props.step) * props.step
    modelValue.value = v
  }
}

const instance = getCurrentInstance()

function onMove(event: MouseEvent | TouchEvent) {
  if (instance?.vnode.el) {
    let newX
    if (event instanceof TouchEvent) {
      newX = event.touches[0].clientX // Get the x coordinate of the first touch point
    } else {
      newX = event.clientX // Get the x coordinate for mouse event
    }
    const dif = newX - x
    const el = instance.vnode.el as HTMLSpanElement
    const width = el.getBoundingClientRect().width
    const change = (dif / width) * (props.max - props.min)
    modelValue.value = Math.round(clamp(v + change, props.min, props.max) / props.step) * props.step
  }
}

function onMouseup() {
  hold.value = false
  window.removeEventListener('mouseup', onMouseup)
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('touchend', onMouseup)
  window.removeEventListener('touchmove', onMove)
}
const id = computed(() => 'input-' + Math.random())
</script>

<template>
  <div class="grid w-full max-w-md items-center gap-2">
    <div class="flex items-center justify-between w-full">
      <label
        v-if="label"
        :for="id"
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted"
        >{{ label }}</label
      >
      <div></div>
      <span>{{ safeValue.toFixed(decimals) }}</span>
    </div>
    <span
      :id="id"
      @mousedown="onMousedown"
      @touchstart="onMousedown"
      data-orientation="horizontal"
      class="relative flex touch-none select-none items-center w-full"
      aria-disabled="false"
      style="--slider-transform: translateX(-50%)"
    >
      <span
        data-orientation="horizontal"
        class="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary"
      >
        <span
          data-orientation="horizontal"
          class="absolute h-full bg-primary"
          :style="{ left: '0%', right: `${100 - offset}%` }"
        >
        </span>
      </span>

      <div
        class="cursor-pointer block h-5 w-5 rounded-full border-solid border-2 border-primary bg-background hover:bg-brand ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        :class="{
          'bg-brand border-brand': hold,
        }"
        role="slider"
        @keydown.right.prevent="change(+1)"
        @keydown.left.prevent="change(-1)"
        tabindex="0"
        data-orientation="horizontal"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="modelValue"
        :style="{
          transform: 'var(--slider-transform)',
          position: 'absolute',
          left: `calc(${offset}% + 1px)`,
        }"
      ></div>
    </span>
  </div>
</template>
