<template>
  <v-app>
    <v-main>
      <div class="mx-auto mt-4 pa-4" style="width: 60%; min-width: 400px;">
        <v-form @submit.prevent="fetchAmoToken" ref="tokenForm" validate-on="submit">
          <div class="d-flex align-center justify-space-between">
            <v-text-field
              v-model="code"
              :rules="rules.entryRequiredRule"
              label="Authorization code"
              variant="outlined"
              hide-details
              density="compact"
            ></v-text-field>
            <v-btn class="ml-4 bg-indigo" type="submit">
              Get token
            </v-btn>
          </div>
          <div v-if="errorMessage" class="text-red text-center" style="font-size: 12px;">{{ errorMessage }}</div>
        </v-form>
        <h2 class="text-center my-4">Personal Data</h2>
        <v-form @submit.prevent="submit" ref="formRef" validate-on="submit">
          <v-text-field
            v-model="firstName"
            :rules="rules.entryRequiredRule"
            label="First Name"
            variant="outlined"
            density="compact"
            class="mb-2"
          ></v-text-field>

          <v-text-field
            v-model="lastName"
            :rules="rules.entryRequiredRule"
            label="Last Name"
            variant="outlined"
            density="compact"
            class="mb-2"
          ></v-text-field>

          <v-text-field
            v-model="phone"
            :rules="rules.phoneRule"
            label="Phone Number"
            variant="outlined"
            density="compact"
            class="mb-2"
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="rules.emailRule"
            label="E-mail"
            variant="outlined"
            density="compact"
            class="mb-2"
          ></v-text-field>

          <v-text-field
            v-model="age"
            :rules="rules.ageRule"
            label="Age"
            variant="outlined"
            density="compact"
            class="mb-2"
          ></v-text-field>

          <v-radio-group v-model="isMale" inline label="Gender">
            <v-radio label="Male" :value="true"></v-radio>
            <v-radio label="Female" :value="false"></v-radio>
          </v-radio-group>

          <v-btn
            class="me-4 bg-red-darken-1"
            type="submit"
          >
            Submit
          </v-btn>

          <v-btn class="bg-grey-darken-1" @click="handleReset">
            Clear
          </v-btn>
        </v-form>
      </div>
    </v-main>

  </v-app>
</template>

<script setup>
import { useUserStore } from './stores/userStore'
import {reactive, ref} from "vue";

const formRef = ref(null);
const tokenForm = ref(null);
const userStore = useUserStore()
const errorMessage = ref('')
const code = ref('')
const firstName = ref('')
const lastName = ref('')
const phone = ref(null)
const email = ref('')
const age = ref(null)
const isMale = ref(true)

const rules = reactive({
  entryRequiredRule: [
    v => !!v || 'Entry required',
  ],
  phoneRule: [
    v => v?.length > 9 && /^[0-9+]+$/g.test(v) || 'Enter your phone correctly. Like 998901112233',
  ],
  ageRule: [
    v => v <= 120 && /\d/g.test(v) || 'Enter your age correctly',
  ],
  emailRule: [
    v => /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(v) || 'Must be a valid e-mail',
  ],
})

const submit = async() => {

  const { valid } = await formRef.value.validate()
  if (valid) {
    userStore.pushPersonalData({
      firstName: firstName.value,
      lastName: lastName.value,
      phone: phone.value.toString(),
      email: email.value,
      age: +age.value,
      isMale: isMale.value,
    })
      .then(() => {
        handleReset()
      })
  } else {
    console.log('not validated')
  }
}

function handleReset() {
  firstName.value = ''
  lastName.value = ''
  phone.value = null
  email.value = ''
  age.value = null
  isMale.value = true
}

const fetchAmoToken = async() => {
  const { valid } = await tokenForm.value.validate()

  if (valid) {
    userStore.fetchAmoAuthToken(code.value)
      .then(() => {
        if (userStore.status === 200) {
          showMessage('Токен успешно получен')
        }
      })
      .catch(() => {
        showMessage('Что то пошло не так. Попробуйте еще раз')
      })
      .finally(() => {
        code.value = ''
      })
  }
}

function showMessage(message) {
  errorMessage.value = message
  setTimeout(() => {
    errorMessage.value = ''
  }, 3000)
}

const auth = () => {
  userStore.fetchToken({username: 'string', password: 'string'})
}
</script>
