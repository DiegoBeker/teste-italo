<template>
  <div class="q-pa-md col self-center" style="max-width: 400px">
    <q-input
      filled
      v-model="user.nome"
      label="Nome"
    />
    <q-input
      filled
      v-model="user.login"
      label="Login"
    />
    <q-input
      filled
      v-model="user.senha"
      label="Senha"
    />
    <q-input
      filled
      v-model="user.grupo"
      label="Grupo"
    />

    <div>
      <q-btn label="Criar" type="button" color="secondary" @click="create"/>
    </div>
  </div>
</template>

<script>
import { SESSION_SERVICE } from 'src/services/session';
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ManageUsersPage',

  data: () => ({
    user: {
      nome: undefined,
      login: undefined,
      senha: undefined,
      grupo: undefined,
    },

  }),

  setup() {
    const session = SESSION_SERVICE.getSession();
    const router = useRouter();
    console.log(session);
    if (!session) router.push('/');
  },

  computed: {
    ...mapState({ users: (state) => state.global.users }),
  },

  methods: {
    ...mapActions({ createUser: 'global/createUser' }),
    create() {
      console.log(this.user);
      this.createUser(this.user);
      alert('Usuario criado');
      this.reset();
    },
    reset() {
      this.user = {
        nome: undefined,
        login: undefined,
        senha: undefined,
        grupo: undefined,
      };
    },
  },
});
</script>
