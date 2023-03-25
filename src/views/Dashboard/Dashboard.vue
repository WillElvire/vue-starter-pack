<template>
  <div class="flex items-center justify-between">
    <h1 class="text-3xl block font-bold text-primary">Tableau de bord</h1>
    <div>
      <n-button type="primary">Suivre une campagne</n-button>
    </div>
  </div>

  <div class="flex items-center space-x-2 mt-4">
    <n-card class="shadow-sm">
      <n-statistic label="Campagnes suivies">
        <template #prefix> </template>
        <template #suffix>0</template>
      </n-statistic>
    </n-card>
    <n-card class="shadow-sm">
      <n-statistic label="Campagne en cours">
        <template #prefix> </template>
        <template #suffix> 0</template>
      </n-statistic>
    </n-card>
    <n-card class="shadow-sm">
      <n-statistic label="Point total">
        <template #prefix> </template>
        <template #suffix>100</template>
      </n-statistic>
    </n-card>
  </div>

  <div class="mt-8"></div>
  <div class="mt-8"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { NButton, NSpace, NStatistic, NIcon, NCard } from 'naive-ui'
import { List } from '@vicons/carbon'

export default defineComponent({
  name: 'Dashboard',

  components: {
    NButton,
    NSpace,
    NStatistic,
    NIcon,
    NCard,
    List,
  },

  setup() {
    const router = useRouter()

    onMounted(() => {})

    return {}
  },
})
</script>
