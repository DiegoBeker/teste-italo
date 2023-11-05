<template>
    <div class="q-ma-lg text-h2">Bem vindo, {{ session.nome }}!</div>
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

    if (!session) router.push('/');

    return { session };
  },

});
</script>
