<script setup lang="ts">
import { TabsIndicator, TabsList, TabsRoot, TabsTrigger } from 'radix-vue'
import { nextTick, provide, ref } from 'vue'

interface TTab {
  label: string
  value: string
}
const tabs = ref<TTab[]>([])

const props = defineProps<{ defaultValue?: string }>()

async function registerTab(t: TTab) {
  tabs.value.push(t)
  await nextTick(() => {
    if (!tab.value) {
      tab.value = props.defaultValue || t.value
    }
  })
}

function remove(v: string) {
  tabs.value = tabs.value.filter(t => t.value !== v)
}

const tab = ref('')

provide('ui-tabs-controller', { registerTab, remove })
</script>

<template>
  <TabsRoot
    class="flex flex-col w-full shadow-[0_2px_10px] shadow-blackA4 border-line border-1px border-solid rounded-2 bg-transparent"
    v-model="tab"
    :defaultValue="defaultValue"
  >
    <TabsList
      class="relative shrink-0 flex border-b border-mauve6"
      aria-label="Manage your account"
    >
      <TabsIndicator
        class="absolute px-5 left-0 h-[2px] bottom-0 w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position] rounded-full transition-[width,transform] duration-300"
      >
        <div class="bg-primary w-full h-full" />
      </TabsIndicator>
      <TabsTrigger
        v-for="tab of tabs"
        class="h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none rounded-tl-md hover:text-grass11 data-[state=active]:text-grass11 outline-none cursor-default focus-visible:relative focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black"
        :value="tab.value"
      >
        {{ tab.label }}
      </TabsTrigger>
    </TabsList>
    <slot> </slot>
  </TabsRoot>
</template>
