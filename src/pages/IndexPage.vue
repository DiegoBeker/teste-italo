<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form
      @submit.prevent="onSubmit"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="user.login"
        label="Login"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type your login']"
        />

      <q-input
        filled
        type="password"
        v-model="user.password"
        label="Password"
        lazy-rules
        :rules="[
        val => val !== null && val !== '' || 'Please type your password',
        ]"
      />

      <div>
        <q-btn label="Submit" type="submit" color="secondary"/>
      </div>
    </q-form>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

export default defineComponent({
  name: 'IndexPage',
  data: () => ({ user: { login: undefined, password: undefined } }),
  methods: {
    ...mapActions({ login: 'global/login' }),
    onSubmit() {
      this.login(this.user);
    },
  },
});
</script>
