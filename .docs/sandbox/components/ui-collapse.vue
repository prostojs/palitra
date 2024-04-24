<script setup lang="ts">
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from 'radix-vue'
import { ref } from 'vue'

defineProps<{ label?: string }>()
const open = ref(true)
</script>

<template>
  <CollapsibleRoot v-model:open="open" class="group">
    <div class="w-full">
      <CollapsibleTrigger
        class="cursor-default flex gap-4 items-center group-hover:bg-secondary w-full p-2 rounded"
      >
        <svg
          :data-state="open ? 'open' : 'close'"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 56 56"
          class="data-[state=open]:rotate-180 data-[state=closed]:rotate-0 transition-all"
        >
          <path
            fill="currentColor"
            d="M28 39.46a2.11 2.11 0 0 0 1.57-.679l18.164-18.586a2.09 2.09 0 0 0 .633-1.5a2.122 2.122 0 0 0-2.156-2.156a2.27 2.27 0 0 0-1.523.61L28 34.21L11.313 17.148a2.226 2.226 0 0 0-1.524-.609a2.122 2.122 0 0 0-2.156 2.156c0 .586.234 1.102.633 1.524L26.43 38.78c.445.446.96.68 1.57.68"
          />
        </svg>
        <h3 class="m-0!">{{ label }}</h3>
      </CollapsibleTrigger>
    </div>

    <CollapsibleContent
      class="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden"
    >
      <slot></slot>
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
