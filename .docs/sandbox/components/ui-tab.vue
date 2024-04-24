<script setup lang="ts">
import { TabsContent } from 'radix-vue'
import { inject, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  label: string
  value: string
}>()
interface TTab {
  label: string
  value: string
}

const tabs = inject<{ registerTab: (t: TTab) => void; remove: (v: string) => void }>(
  'ui-tabs-controller'
)

onMounted(() => {
  tabs?.registerTab({ label: props.label, value: props.value })
})

onUnmounted(() => {
  tabs?.remove(props.value)
})
</script>

<template>
  <TabsContent class="grow rounded-b-md outline-none" :value="value">
    <slot></slot>
  </TabsContent>
</template>
