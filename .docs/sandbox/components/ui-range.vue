<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue'
import { clamp } from '../../../src/utils/utils'

type Props = {
  min?: number
  max?: number
  step?: number
  useMiddle?: boolean
  label?: string
  decimals?: number
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  step: 1,
  decimals: 0,
})

const from = defineModel<number>('from')
const to = defineModel<number>('to')
const middle = defineModel<number>('middle')

const safeFrom = computed(() => (typeof from.value === 'number' ? from.value : props.min))
const safeTo = computed(() => (typeof to.value === 'number' ? to.value : props.max))
const safeMiddle = computed(() =>
  typeof middle.value === 'number' ? middle.value : (safeTo.value - safeFrom.value) / 2
)

const offsetFrom = computed(() =>
  round(((safeFrom.value - props.min) / (props.max - props.min)) * 100)
)
const offsetTo = computed(() => round(((safeTo.value - props.min) / (props.max - props.min)) * 100))
const offsetMiddle = computed(() =>
  round(((safeMiddle.value - props.min) / (props.max - props.min)) * 100)
)

function round(v: number) {
  return Math.round(v)
}

function changeFrom(k: number) {
  if (typeof from.value !== 'number') {
    from.value = safeFrom.value
  }
  from.value = clamp(from.value + k * props.step, props.min, props.max)
}
function changeTo(k: number) {
  if (typeof to.value !== 'number') {
    to.value = safeTo.value
  }
  to.value = clamp(to.value + k * props.step, props.min, props.max)
}
function changeMiddle(k: number) {
  if (typeof middle.value !== 'number') {
    middle.value = safeMiddle.value
  }
  middle.value = clamp(middle.value + k * props.step, props.min, props.max)
}

let x = 0
let v = 0
let model = from
let _min = 0
let _max = 0
const hold = ref(false)

function onMousedown(event: MouseEvent) {
  window.addEventListener('mouseup', onMouseup)
  window.addEventListener('mousemove', onMove)
  hold.value = true
  x = event.screenX
  if ((event.target as HTMLDivElement)?.dataset.bind === 'from') {
    v = safeFrom.value
    model = from
    _min = props.min
    _max = props.useMiddle ? safeMiddle.value : safeTo.value
  } else if ((event.target as HTMLDivElement)?.dataset.bind === 'to') {
    v = safeTo.value
    model = to
    _min = props.useMiddle ? safeMiddle.value : safeFrom.value
    _max = props.max
  } else {
    v = safeMiddle.value
    model = middle
    _min = safeFrom.value
    _max = safeTo.value
  }
}

const instance = getCurrentInstance()

function onMove(event: MouseEvent) {
  if (instance?.vnode.el) {
    const dif = event.screenX - x
    const el = instance.vnode.el as HTMLSpanElement
    const width = el.getBoundingClientRect().width
    const change = (dif / width) * (props.max - props.min)
    model.value = Math.round(clamp(v + change, _min, _max) / props.step) * props.step
  }
}

function onMouseup() {
  hold.value = false
  window.removeEventListener('mouseup', onMouseup)
  window.removeEventListener('mousemove', onMove)
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
      <div class="flex items-center gap-2">
        <span>{{ safeFrom.toFixed(decimals) }}</span> <span>|</span>
        <span v-if="useMiddle">{{ safeMiddle.toFixed(decimals) }}</span>
        <span v-if="useMiddle">|</span>
        <span>{{ safeTo.toFixed(decimals) }}</span>
      </div>
    </div>
    <span
      :id="id"
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
          :style="{ left: `${offsetFrom}%`, right: `${100 - offsetTo}%` }"
        >
        </span>
      </span>

      <div
        class="cursor-pointer block h-5 w-5 rounded-full border-solid border-2 border-primary bg-background hover:bg-brand ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        :class="{
          'bg-brand border-brand': hold,
        }"
        data-bind="from"
        role="slider"
        @keydown.right.prevent="changeFrom(+1)"
        @keydown.left.prevent="changeFrom(-1)"
        @mousedown="onMousedown"
        tabindex="0"
        data-orientation="horizontal"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="from"
        :style="{
          transform: 'var(--slider-transform)',
          position: 'absolute',
          left: `calc(${offsetFrom}% + 1px)`,
        }"
      ></div>

      <div
        v-if="useMiddle"
        class="cursor-pointer block h-5 w-5 rounded-full border-solid border-2 border-primary bg-background hover:bg-brand ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        :class="{
          'bg-brand border-brand': hold,
        }"
        data-bind="middle"
        role="slider"
        @keydown.right.prevent="changeMiddle(+1)"
        @keydown.left.prevent="changeMiddle(-1)"
        @mousedown="onMousedown"
        tabindex="0"
        data-orientation="horizontal"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="to"
        :style="{
          transform: 'var(--slider-transform)',
          position: 'absolute',
          left: `calc(${offsetMiddle}% + 1px)`,
        }"
      ></div>

      <div
        class="cursor-pointer block h-5 w-5 rounded-full border-solid border-2 border-primary bg-background hover:bg-brand ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        :class="{
          'bg-brand border-brand': hold,
        }"
        data-bind="to"
        role="slider"
        @keydown.right.prevent="changeTo(+1)"
        @keydown.left.prevent="changeTo(-1)"
        @mousedown="onMousedown"
        tabindex="0"
        data-orientation="horizontal"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="to"
        :style="{
          transform: 'var(--slider-transform)',
          position: 'absolute',
          left: `calc(${offsetTo}% + 1px)`,
        }"
      ></div>
    </span>
  </div>
</template>
