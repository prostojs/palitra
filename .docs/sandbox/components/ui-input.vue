<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label?: string
  class?: string | Record<string, boolean>
  name?: string
  type?: string
  placeholder?: string
}>()

const id = computed(() => props.name || 'input-' + Math.random())

const modelValue = defineModel()
</script>

<template>
  <div class="grid max-w-md items-center gap-1.5">
    <label
      :for="id"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted"
      >{{ label }}</label
    >
    <div
      class="border-line hover:border-brand items-center justify-between flex h-10 w-full rounded-md border-solid border-1px bg-background px-3 py-2 text-sm ring-offset-background file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <input :id="id" :type="type || 'text'" :placeholder v-model="modelValue" class="flex-1" />
      <slot name="append"></slot>
    </div>
  </div>
</template>
