<template>
    <h1>Olá, Usuário</h1>
</template>

<script>
import { SESSION_SERVICE } from 'src/services/session';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'HomePage',
  setup() {
    const session = SESSION_SERVICE.getSession();
    const router = useRouter();
    console.log(session);
    if (!session) router.push('/');
  },
});
</script>
