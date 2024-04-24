<script setup lang="ts">
import { CheckboxIndicator, CheckboxRoot } from 'radix-vue'

defineProps<{
  label?: string
}>()

const modelValue = defineModel<boolean>()
</script>

<template>
  <label class="flex flex-row gap-4 items-center [&>.checkbox]:hover:bg-secondary">
    <CheckboxRoot
      v-model:checked="modelValue"
      class="shadow-blackA7 select-none hover:border-brand hover:secondary flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-[4px] bg-background shadow-[0_2px_10px] outline-none focus-within:shadow-[0_0_0_2px_black] border-line border-1px border-solid"
    >
      <CheckboxIndicator
        class="bg-background h-full w-full rounded flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024">
          <path
            fill="currentColor"
            d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5L207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8"
          />
        </svg>
      </CheckboxIndicator>
    </CheckboxRoot>
    <span class="select-none text-primary text-sm">{{ label }}</span>
  </label>
</template>
