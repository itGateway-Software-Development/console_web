<script setup>
import { useGenerateImageVariant } from '@/@core/composable/useGenerateImageVariant'
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
import authV2LoginMaskDark from '@images/pages/auth-v2-login-mask-dark.png'
import authV2LoginMaskLight from '@images/pages/auth-v2-login-mask-light.png'
import { themeConfig } from '@themeConfig'
import axios from 'axios'
import { ref } from 'vue'

const form = ref({
  email: '',
  password: '',
})

const isMissMatchPassword = ref(false);
const errors = ref(null);

const route = useRoute()
const router = useRouter()


const login = async () => {
  try {
    const formData = new FormData();
    formData.append('email', form.value.email);
    formData.append('password', form.value.password);

    const token = encodeURIComponent('itGateway1234!@#$2024');

    const res = await axios.post(`https://console.app.itgatewaycloud.com/api/v1/login?token=${token}`, formData);

    if(res.status === 404) {
      throw new Error("page not found");
    }
    console.log(res.data);
    if(res.data.message == 'success') {
      // useCookie('userData').value = res.data.user
      // useCookie('accessToken').value = res.data.token

      localStorage.setItem('userData', JSON.stringify(res.data.user))
      localStorage.setItem('token', JSON.stringify(res.data.token))

      await nextTick(() => {
        router.replace('/dashboard')
      })
    }
  }
  catch (err) {
    alert('something wrong')
    console.error(err)
  }
}

const submit = () => {
  if(form.value.email == '' || form.value.password == '' ) {
    alert('Please fill all fields');
    return;
  }

  login();
}

definePage({ meta: { layout: 'blank' } })

const isPasswordVisible = ref(false)
const authV2LoginMask = useGenerateImageVariant(authV2LoginMaskLight, authV2LoginMaskDark)
const authV2LoginIllustration = useGenerateImageVariant(authV2LoginIllustrationLight, authV2LoginIllustrationDark, authV2LoginIllustrationBorderedLight, authV2LoginIllustrationBorderedDark, true)
</script>

<template>
  <div class="d-flex justify-center align-center gap-2 logo" style="margin-top: 80px;">
    <img style="width: 50px;" src="@/assets/images/logo.png"  alt="">
    <h3>{{themeConfig.app.title}}</h3>
  </div>
  <div style="height: 80vh; margin-top: 50px;">
    <VRow
    no-gutters
    class="auth-wrapper"
  >
    <VCol
      cols="12"
      md="6"
      class="d-none d-md-flex align-center justify-center position-relative"
    >
      <div class="d-flex flex-column align-start ms-5 pa-10">
        <h2>Sing In</h2>
        <p>Sign in to your cloud console or Sign up for new account.</p>
      </div>
    </VCol>
    <VCol
      cols="12"
      md="6"
      class="auth-card-v2 d-flex align-center justify-start"
      style="border-left: 2px solid gray;"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-5 pa-lg-7"
        style="background: transparent;"
      >
        <VCardText>
          <h4 class="text-h4 mb-1">
            Sign In to <span class="text-capitalize">{{ themeConfig.app.title }}</span>
          </h4>
        </VCardText>

        <VCardText>
          <VForm @submit.prevent="() => {}">
            <VRow>

              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="form.email"
                  label="Email"
                  type="email"
                  placeholder="johndoe@email.com"
                />
              </VCol>

              <!-- password confirmation -->
              <VCol cols="12">
                <VTextField
                  v-model="form.password"
                  label="Password"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
                <span class="text-sm password-mismatch" v-if="isMissMatchPassword" style="color: red;">Password not match</span>
                <!-- remember me checkbox -->
                <div class="d-flex align-center justify-space-between flex-wrap my-6 gap-x-2">
                  <!-- <VCheckbox
                    v-model="form.remember"
                    label="Remember me"
                  /> -->

                  <!-- <a
                    class="text-primary"
                    href="#"
                  >
                    Forgot Password?
                  </a> -->
                </div>

                <!-- login button -->
                <button class="auth-btn" @click="submit">Login</button>
              </VCol>

              <!-- create account -->
              <VCol
                cols="12"
                class="text-body-1 text-center"
              >
                <span class="d-inline-block">
                  A new user to our system ?
                </span>
                <RouterLink to="/register" class="text-primary ms-1 d-inline-block text-body-1">
                  Sign Up
                </RouterLink>
              </VCol>

              <VCol
                cols="12"
                class="d-flex align-center"
              >
                <VDivider />
                <span class="mx-4 text-high-emphasis">or</span>
                <VDivider />
              </VCol>

              <!-- auth providers -->
              <VCol
                cols="12"
                class="text-center"
              >
                <AuthProvider />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  </div>
</template>

<style lang="scss">
  @use "@core/scss/template/pages/page-auth.scss";
</style>
