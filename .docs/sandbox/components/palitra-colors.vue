<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import {
  palitra,
  type TPalitraInput,
  type TScaleOptionsInput,
  type TPalitraOptions,
} from '../../../src'
import UiCollapse from './ui-collapse.vue'

const props = defineProps<{
  colors: TPalitraInput
  defaultOpts?: TScaleOptionsInput & TPalitraOptions
}>()

interface TPaletteColor {
  name: string
  dark: string
  dark2: string
  light: string
  light2: string
  shades: { name: string; color: string; isDark: boolean }[]
}

const palette = computed(() => palitra(props.colors, props.defaultOpts))
const paletteFormatted = computed<TPaletteColor[]>(() => {
  const result: Record<string, TPaletteColor | undefined> = {}

  for (const [key, val] of Object.entries(palette.value)) {
    if (val && typeof val !== 'function') {
      result[val.grp] = result[val.grp] || {
        name: val.grp,
        shades: [],
        dark: '',
        light: '',
        dark2: '',
        light2: '',
      }
      const grp = result[val.grp]
      if (grp) {
        grp.shades.unshift({ name: key, color: val.color, isDark: val.isDark })
        if (key.endsWith('-800')) {
          grp.dark = val.color
        } else if (key.endsWith('-100')) {
          grp.light = val.color
        } else if (key.endsWith('-700')) {
          grp.dark2 = val.color
        } else if (key.endsWith('-200')) {
          grp.dark2 = val.color
        }
      }
    }
  }
  return Object.values(result) as TPaletteColor[]
})

const colorStyles = computed(() => {
  const s: Record<string, string> = {}
  for (const grp of paletteFormatted.value) {
    for (const shade of grp.shades) {
      s[`--c-${shade.name}`] = shade.color
    }
  }
  return s
})

const colorScopes = computed(() => {
  const s: Record<string, Record<string, string>> = {}
  for (const grp of paletteFormatted.value) {
    const scope: Record<string, string> = {}
    for (const shade of grp.shades) {
      scope[`--c-scope-${shade.name === grp.name ? '' : shade.name.split('-').pop()}`] = shade.color
      if (shade.name.endsWith('-900')) {
        scope['--c-scope-black'] = shade.color
      } else if (shade.name.endsWith('-800')) {
        scope['--c-scope-dark'] = shade.color
      } else if (shade.name.endsWith('-50')) {
        scope['--c-scope-white'] = shade.color
      } else if (shade.name.endsWith('-100')) {
        scope['--c-scope-light'] = shade.color
      } else if (shade.name.endsWith('-700')) {
        scope['--c-scope-dark-2'] = shade.color
      } else if (shade.name.endsWith('-200')) {
        scope['--c-scope-light-2'] = shade.color
      }
    }
    s[grp.name] = scope
  }
  return s
})

let interval: number

const darkMode = ref(false)

onMounted(() => {
  interval = setInterval(() => {
    darkMode.value = !!document.querySelector('html')?.classList.contains('dark')
  }, 200)
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>
<template>
  <UiCollapse label="Output">
    <div class="flex gap-0 flex-wrap pb-4">
      <div v-for="grp of paletteFormatted">
        <div
          v-for="shade of grp.shades"
          class="w-90px h-30px lh-30px text-center text-xs group/shade"
          :class="{
            'my-4': shade.name === grp.name,
          }"
          :style="{
            'background-color': shade.color,
            '--c-back': darkMode ? grp.light : grp.dark,
            '--c-front': darkMode ? grp.dark : grp.light,
            '--c-border': darkMode ? grp.dark2 : grp.light2,
            '--c-border-inv': darkMode ? grp.light2 : grp.dark2,
            'color': shade.isDark ? grp.light : grp.dark,
          }"
        >
          <span class="opacity-100 hidden group-hover/shade:block">{{ shade.color }}</span>
          <span
            class="group-hover/shade:hidden"
            :class="{
              'opacity-40': shade.name !== grp.name,
            }"
            >{{ shade.name }}</span
          >
        </div>
      </div>
    </div>
  </UiCollapse>
  <div
    :style="{ ...colorStyles, ...colorScopes.grey }"
    class="mt-10 palette-test void rounded-2 overflow-hidden shadow-lg overflow-hidden"
  >
    <nav class="surface p-5 border-b-1px border-b-solid flex items-center justify-between">
      <h4
        class="scope-brand"
        :style="`color: ${darkMode ? 'var(--c-brand-400)' : 'var(--c-brand-600)'};`"
      >
        Palitra Colors
      </h4>
      <button
        class="p-btn p-btn-flat rounded-full! size-40px p-0! flex justify-center items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 256 256">
          <path
            fill="currentColor"
            d="M172 120a44 44 0 1 1-44-44a44.05 44.05 0 0 1 44 44m60 8A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104m-16 0a88.09 88.09 0 0 0-91.47-87.93C77.43 41.89 39.87 81.12 40 128.25a87.65 87.65 0 0 0 22.24 58.16A79.71 79.71 0 0 1 84 165.1a4 4 0 0 1 4.83.32a59.83 59.83 0 0 0 78.28 0a4 4 0 0 1 4.83-.32a79.71 79.71 0 0 1 21.79 21.31A87.62 87.62 0 0 0 216 128"
          />
        </svg>
      </button>
    </nav>
    <div class="flex min-h-300px overflow-x-auto">
      <aside class="surface w-80px border-r-1px border-r-solid py-6">
        <div class="flex flex-col items-center w-full gap-4">
          <button
            class="size-60px rounded-full! p-0! p-btn p-btn-flat flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 2048 2048">
              <path
                fill="currentColor"
                d="m1024 166l941 941l-90 90l-83-82v805h-512v-640H768v640H256v-805l-83 82l-90-90z"
              />
            </svg>
          </button>

          <button
            class="size-60px rounded-full! p-0! p-btn p-btn-flat flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48">
              <defs>
                <mask id="ipSConfig0">
                  <g fill="none" stroke-linejoin="round" stroke-width="4">
                    <path
                      fill="#fff"
                      stroke="#fff"
                      d="m24 4l-6 6h-8v8l-6 6l6 6v8h8l6 6l6-6h8v-8l6-6l-6-6v-8h-8z"
                    />
                    <path fill="#000" stroke="#000" d="M24 30a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z" />
                  </g>
                </mask>
              </defs>
              <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSConfig0)" />
            </svg>
          </button>

          <button
            class="size-60px rounded-full! p-0! p-btn p-btn-flat flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M5 10c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m14 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m-7 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2"
              />
            </svg>
          </button>
        </div>
      </aside>
      <div class="flex-1 p-5 flex flex-col gap-4">
        <div>
          <h3 class="mt-5! mb-0! pb-0! lh-10px">Test Page</h3>
          <div class="flex gap-2 mt-2 text-xs">
            <span class="p-banner px-2 py-1">@prostojs/palitra</span>
            <span class="p-banner scope-positive px-2 py-1">License MIT</span>
          </div>
        </div>
        <p>
          Palitra Output Colors applied to this window in realtime. Each change in Palitra will be
          reflected here immediately 😊.
        </p>
        <div class="border-y-solid border-y-1px py-4" style="border-color: var(--c-light-2)">
          <h4>Buttons</h4>
          <div class="flex items-center justify-center gap-4 pt-4">
            <button class="p-btn scope-positive">Positive</button>
            <button class="p-btn scope-negative">Negative</button>
            <button class="p-btn scope-neutral">Neutral</button>
            <button class="p-btn scope-brand">Brand</button>
            <button class="p-btn scope-warning">Warning</button>
            <button class="p-btn scope-accent">Accent</button>
          </div>
          <div class="flex items-center justify-center gap-4 pt-4">
            <button class="p-btn p-btn-outline scope-positive">Positive</button>
            <button class="p-btn p-btn-outline scope-negative">Negative</button>
            <button class="p-btn p-btn-outline scope-neutral">Neutral</button>
            <button class="p-btn p-btn-outline scope-brand">Brand</button>
            <button class="p-btn p-btn-outline scope-warning">Warning</button>
            <button class="p-btn p-btn-outline scope-accent">Accent</button>
          </div>
          <div class="flex items-center justify-center gap-4 pt-4">
            <button class="p-btn p-btn-flat scope-positive">Positive</button>
            <button class="p-btn p-btn-flat scope-negative">Negative</button>
            <button class="p-btn p-btn-flat scope-neutral">Neutral</button>
            <button class="p-btn p-btn-flat scope-brand">Brand</button>
            <button class="p-btn p-btn-flat scope-warning">Warning</button>
            <button class="p-btn p-btn-flat scope-accent">Accent</button>
          </div>
        </div>
        <h4>Banners</h4>
        <div class="scope-neutral p-banner px-5 py-4">
          <h4 class="m-0!">Neutral banner</h4>
          <p class="m-0!">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div class="scope-brand p-banner px-5 py-4">
          <h4 class="m-0!">Brand banner</h4>
          <p class="m-0!">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div class="scope-positive p-banner px-5 py-4">
          <h4 class="m-0!">Positive banner</h4>
          <p class="m-0!">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div class="scope-warning p-banner px-5 py-4">
          <h4 class="m-0!">Warning banner</h4>
          <p class="m-0!">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div class="scope-negative p-banner px-5 py-4">
          <h4 class="m-0!">Negative banner</h4>
          <p class="m-0!">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div
          class="border-t-solid border-t-1px mt-4 pt-6 pb-2 flex justify-center items-center gap-4"
          style="border-color: var(--c-light-2)"
        >
          <button class="p-btn scope-neutral p-btn-flat">Cancel</button>
          <button class="p-btn scope-negative p-btn-flat">Remove</button>
          <button class="p-btn scope-accent">Apply</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* light */
.palette-test.void,
.palette-test .void {
  --c-background: white;
  --c-background-2: var(--c-scope-white);
  --c-text: var(--c-scope-black);
  background-color: var(--c-background);
  color: var(--c-scope-black);
  border-color: var(--c-scope-light);
}
.palette-test.surface,
.palette-test .surface {
  --c-background: var(--c-scope-white);
  --c-background-2: var(--c-scope-light);
  --c-text: var(--c-scope-dark);
  background-color: var(--c-background);
  color: var(--c-scope-dark);
  border-color: var(--c-scope-light);
}
/*  dark */
.dark .palette-test.void,
.dark .palette-test .void {
  --c-background: var(--c-scope-black);
  --c-background-2: var(--c-scope-dark);
  --c-text: var(--c-scope-white);
  background-color: var(--c-scope-black);
  color: var(--c-scope-white);
  border-color: var(--c-scope-dark-2);
}
.dark .palette-test.surface,
.dark .palette-test .surface {
  --c-background: var(--c-scope-dark);
  --c-background-2: var(--c-scope-dark-2);
  --c-text: var(--c-scope-light);
  background-color: var(--c-scope-dark);
  color: var(--c-scope-light);
  border-color: var(--c-scope-dark-2);
}

/* styles */

/* btn */
.palette-test .p-btn {
  box-sizing: content-box;
  background-color: var(--c-scope-500);
  color: var(--c-scope-white);
  padding: 4px 12px;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
}
.palette-test .p-btn.p-btn:hover {
  background-color: var(--c-scope-400);
  color: var(--c-scope-white);
  padding: 4px 12px;
  border-radius: 4px;
}
/* btn outline */
.palette-test .p-btn.p-btn-outline {
  background-color: var(--c-background);
  color: var(--c-dark-2);
  border-color: var(--c-scope-500);
  border-width: 1px;
  border-style: solid;
}
.palette-test .p-btn.p-btn-outline:hover {
  color: var(--c-text);
  background-color: var(--c-light);
}
/* btn flat */
.palette-test .p-btn.p-btn-flat {
  background-color: transparent;
  color: var(--c-dark-2);
}
.palette-test .p-btn.p-btn-flat:hover {
  background-color: var(--c-light);
  color: var(--c-dark-2);
}

.palette-test .p-btn.p-btn-flat svg {
  transition: color 0.2s ease-in-out;
  color: var(--c-scope-400);
}
.palette-test .p-btn.p-btn-flat:hover svg {
  color: var(--c-dark-3);
}

/* scopes */
.palette-test {
  --c-scope: var(--c-grey-500);
  --c-scope-500: var(--c-grey-500);
  --c-scope-400: var(--c-grey-400);
  --c-scope-600: var(--c-grey-600);
  --c-scope-black: var(--c-grey-900);
  --c-scope-white: var(--c-grey-50);
  --c-scope-dark: var(--c-grey-800);
  --c-scope-dark-2: var(--c-grey-700);
  --c-scope-dark-3: var(--c-grey-600);
  --c-scope-light: var(--c-grey-100);
  --c-scope-light-2: var(--c-grey-200);
  --c-scope-light-3: var(--c-grey-300);
}

.palette-test .scope-negative {
  --c-scope: var(--c-negative-500);
  --c-scope-500: var(--c-negative-500);
  --c-scope-400: var(--c-negative-400);
  --c-scope-600: var(--c-negative-600);
  --c-scope-black: var(--c-negative-900);
  --c-scope-white: var(--c-negative-50);
  --c-scope-dark: var(--c-negative-800);
  --c-scope-dark-2: var(--c-negative-700);
  --c-scope-dark-3: var(--c-negative-600);
  --c-scope-light: var(--c-negative-100);
  --c-scope-light-2: var(--c-negative-200);
  --c-scope-light-3: var(--c-negative-300);
}

.palette-test .scope-neutral {
  --c-scope: var(--c-neutral-500);
  --c-scope-500: var(--c-neutral-500);
  --c-scope-400: var(--c-neutral-400);
  --c-scope-600: var(--c-neutral-600);
  --c-scope-black: var(--c-neutral-900);
  --c-scope-white: var(--c-neutral-50);
  --c-scope-dark: var(--c-neutral-800);
  --c-scope-dark-2: var(--c-neutral-700);
  --c-scope-dark-3: var(--c-neutral-600);
  --c-scope-light: var(--c-neutral-100);
  --c-scope-light-2: var(--c-neutral-200);
  --c-scope-light-3: var(--c-neutral-300);
}

.palette-test .scope-positive {
  --c-scope: var(--c-positive-500);
  --c-scope-500: var(--c-positive-500);
  --c-scope-400: var(--c-positive-400);
  --c-scope-600: var(--c-positive-600);
  --c-scope-black: var(--c-positive-900);
  --c-scope-white: var(--c-positive-50);
  --c-scope-dark: var(--c-positive-800);
  --c-scope-dark-2: var(--c-positive-700);
  --c-scope-dark-3: var(--c-positive-600);
  --c-scope-light: var(--c-positive-100);
  --c-scope-light-2: var(--c-positive-200);
  --c-scope-light-3: var(--c-positive-300);
}

.palette-test .scope-brand {
  --c-scope: var(--c-brand-500);
  --c-scope-500: var(--c-brand-500);
  --c-scope-400: var(--c-brand-400);
  --c-scope-600: var(--c-brand-600);
  --c-scope-black: var(--c-brand-900);
  --c-scope-white: var(--c-brand-50);
  --c-scope-dark: var(--c-brand-800);
  --c-scope-dark-2: var(--c-brand-700);
  --c-scope-dark-3: var(--c-brand-600);
  --c-scope-light: var(--c-brand-100);
  --c-scope-light-2: var(--c-brand-200);
  --c-scope-light-3: var(--c-brand-300);
}

.palette-test .scope-warning {
  --c-scope: var(--c-warning-500);
  --c-scope-500: var(--c-warning-500);
  --c-scope-400: var(--c-warning-400);
  --c-scope-600: var(--c-warning-600);
  --c-scope-black: var(--c-warning-900);
  --c-scope-white: var(--c-warning-50);
  --c-scope-dark: var(--c-warning-800);
  --c-scope-dark-2: var(--c-warning-700);
  --c-scope-dark-3: var(--c-warning-600);
  --c-scope-light: var(--c-warning-100);
  --c-scope-light-2: var(--c-warning-200);
  --c-scope-light-3: var(--c-warning-300);
}
.palette-test .scope-accent {
  --c-scope: var(--c-accent-500);
  --c-scope-500: var(--c-accent-500);
  --c-scope-400: var(--c-accent-400);
  --c-scope-600: var(--c-accent-600);
  --c-scope-black: var(--c-accent-900);
  --c-scope-white: var(--c-accent-50);
  --c-scope-dark: var(--c-accent-800);
  --c-scope-dark-2: var(--c-accent-700);
  --c-scope-dark-3: var(--c-accent-600);
  --c-scope-light: var(--c-accent-100);
  --c-scope-light-2: var(--c-accent-200);
  --c-scope-light-3: var(--c-accent-300);
}

.palette-test,
.palette-test .scope-neutral,
.palette-test .scope-positive,
.palette-test .scope-negative,
.palette-test .scope-warning,
.palette-test .scope-brand,
.palette-test .scope-accent {
  --c-light: var(--c-scope-white);
  --c-light-2: var(--c-scope-light);
  --c-light-3: var(--c-scope-light-2);
  --c-dark: var(--c-scope-dark);
  --c-dark-2: var(--c-scope-dark-2);
  --c-dark-3: var(--c-scope-dark-3);
}
.dark .palette-test,
.dark .palette-test .scope-neutral,
.dark .palette-test .scope-positive,
.dark .palette-test .scope-negative,
.dark .palette-test .scope-warning,
.dark .palette-test .scope-brand,
.dark .palette-test .scope-accent {
  --c-light: var(--c-scope-black);
  --c-light-2: var(--c-scope-dark);
  --c-light-3: var(--c-scope-dark-2);
  --c-dark: var(--c-scope-light);
  --c-dark-2: var(--c-scope-light-2);
  --c-dark-3: var(--c-scope-light-3);
}

/* banner */
.palette-test .p-banner {
  border: 1px solid;
  border-radius: 4px;
  background-color: var(--c-light);
  color: var(--c-dark);
  border-color: var(--c-light-2);
}
</style>
