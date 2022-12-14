<script lang="ts">
import { defineComponent, ref, h } from 'vue'

import NavLink from '@/components/NavLink.vue'

import { NLayoutSider, NIcon, NMenu } from 'naive-ui'
import { LayoutGrid, CaretDown, Paperclip } from '@vicons/carbon'

const menuOptions = [
  {
    label: 'Tableau de bord',
    key: 'dashboard',
    to: '/dashboard',
  },
]

export default defineComponent({
  name: 'Sidebar',

  components: {
    NLayoutSider,
    NIcon,
    LayoutGrid,
    CaretDown,
    NMenu,
    Paperclip,
    NavLink,
  },

  setup() {
    return {
      menuOptions,
      collapsed: ref(true),
      renderMenuLabel(option) {
        if ('to' in option) {
          return h(
            NavLink,
            { link: option.to, class: 'font-bold text-base' },
            { default: () => option.label }
          )
        }

        return option.label
      },
      renderMenuIcon(option) {
        if (option.key === 'dashboard') {
          return h(NIcon, null, { default: () => h(LayoutGrid) })
        }
      },
      expandIcon() {
        return h(NIcon, null, { default: () => h(CaretDown) })
      },
    }
  },
})
</script>

<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :collapsed="collapsed"
    show-trigger
    @collapse="collapsed = true"
    @expand="collapsed = false"
    :native-scrollbar="false"
  >
    <n-menu
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
      :render-label="renderMenuLabel"
      :render-icon="renderMenuIcon"
      :expand-icon="expandIcon"
    />
  </n-layout-sider>
</template>
