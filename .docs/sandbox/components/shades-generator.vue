<script setup lang="ts">
import Shades from './shades.vue'
import { reactive } from 'vue'
import { defaultOptions } from '../../../src/utils/default-options'
import { TPalitraColor, TScaleOptions } from '../../../src'
import PalitraOptions from './palitra-options.vue'

const opts = reactive<Exclude<TPalitraColor<TScaleOptions>, string>>({
  color: '#266ba3',
  ...JSON.parse(JSON.stringify(defaultOptions)),
})
</script>

<template>
  <div class="py-8">
    <div class="flex flex-col gap-10 md:flex-row">
      <PalitraOptions v-model="opts" use-color use-quantity />
      <Shades v-if="opts.count > 2" v-model="opts.color" v-model:opts="opts" />
    </div>
  </div>
</template>
