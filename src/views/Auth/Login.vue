<template>
  <div class="bg-primary h-screen w-screen">
    <div class="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
      <div
        class="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-white sm:mx-0"
        style="height: 500px"
      >
        <div class="flex flex-col w-full md:w-1/2 p-4">
          <div class="flex flex-col flex-1 justify-center mb-8">
            <h1 class="text-4xl text-center font-thin">Welcome !</h1>

            <div class="w-full mt-4">
              <div class="my-4">
                <div class="mb-4 flex justify-center">
                  <n-button @click="loginWithGoogle" color="#EF4444" size="large">
                    <template #icon>
                      <n-icon>
                        <brand-google />
                      </n-icon>
                    </template>
                   Connect using google
                  </n-button>
                </div>

                <div class="flex items-center w-full">
                  <div class="flex-1 h-0 bg-gray-200 border-t border-gray-200"></div>
                  <p class="px-5 text-xs font-semibold tracking-wide text-gray-600 uppercase">ou</p>
                  <div class="flex-1 h-0 bg-gray-200 border-t border-gray-200"></div>
                </div>
              </div>
              <form class="form-horizontal w-3/4 mx-auto" method="POST" action="#">
                <div class="flex flex-col mt-4">
                  <n-input v-model:value="form.email" required placeholder="Email" />
                </div>
                <div class="flex flex-col mt-4">
                  <n-input
                    type="password"
                    show-password-toggle
                    v-model:value="form.password"
                    placeholder="Password"
                    @keydown.enter="login"
                  />
                </div>
                <div class="flex items-center mt-4">
                  <n-space item-style="display: flex;" align="center">
                    <n-checkbox v-model:checked="form.rememberMe">Resté connecté?</n-checkbox>
                  </n-space>
                </div>
                <div class="flex flex-col mt-8">
                  <n-button type="primary" @click="login"> Se connecter </n-button>
                </div>
              </form>

              <div class="text-center mt-4">
                <a class="no-underline hover:underline text-blue-dark text-xs" href="/">
                  Mot de passe oublié?
                </a>
              </div>

                <div class="text-center mt-4">
                <router-link class="no-underline hover:underline text-blue-dark text-xs" to="/register">
                  s'inscrire
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div
          class="hidden md:block md:w-1/2 rounded-r-lg"
          style="
            background: url('https://images.pexels.com/photos/1905054/pexels-photo-1905054.jpeg?cs=srgb&dl=pexels-loc-dang-1905054.jpg&fm=jpg');
            background-size: cover;
            background-position: center center;
          "
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user'

import { NInput, NSpace, NCheckbox, NButton, NIcon, NForm, NFormItem } from 'naive-ui'
import { BrandGoogle } from '@vicons/carbon'

export default defineComponent({
  name: 'Login',

  components: {
    NInput,
    NSpace,
    NCheckbox,
    NButton,
    NIcon,
    BrandGoogle,
    NForm,
    NFormItem,
  },

  setup() {
    const userStore = useUserStore()
    const router = useRouter()

    const form = ref({
      email: null,
      password: null,
      rememberMe: false,
    })

    const login = async () => {
      if (!form.value.email || !form.value.password) {
        window.$message.error("Le mot de passe ou l'email n'est pas correcte.")
        return
      }

      await userStore.login(form.value.email, form.value.password)

      router.push('/')
    }

    return {
      form,
      login,
      loginWithGoogle: userStore.loginWithGoogle,
    }
  },
})
</script>
