<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user'

import { NLayoutHeader, NAvatar, NButton } from 'naive-ui'

export default defineComponent({
  components: {
    NLayoutHeader,
    NAvatar,
    NButton,
  },

  setup() {
    const router = useRouter()
    const userStore = useUserStore()

    const logout = async () => {
      await userStore.logout()
      router.push('/login')
    }

    return { logout }
  },
})
</script>

<template>
  <n-layout-header class="p-4">
    <div class="flex justify-between">
      <div class="logo">
        <a
          href="/"
          class="
            flex
            items-center
            order-first
            mb-4
            font-medium
            text-gray-900
            lg:order-none lg:w-auto
            title-font
            lg:items-center lg:justify-center
            md:mb-0
          "
        >
          <span class="text-2xl font-black leading-none text-gray-900 select-none logo"
            >VSP<span class="text-indigo-600">.</span></span
          >
        </a>
      </div>
      <div class="flex items-center space-x-4">
        <n-avatar
          round
          size="medium"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
        <n-button text @click="logout"> Se déconnecter </n-button>
      </div>
    </div>
  </n-layout-header>
</template>
