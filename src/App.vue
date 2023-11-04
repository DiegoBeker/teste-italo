<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'App',
  setup() {
    const $store = useStore();

    function getData() {
      const storedData = localStorage.getItem('users');
      if (!storedData) {
        const data = [
          {
            nome: 'admin',
            login: 'admin',
            senha: 123123,
            grupo: 'administrador',
          },
        ];
        const serializedData = JSON.stringify(data);
        localStorage.setItem('users', serializedData);
        $store.commit('global/updateUsers', data);
      } else {
        const unserializedData = JSON.parse(storedData);
        $store.commit('global/updateUsers', unserializedData);
      }
    }
    onMounted(() => {
      getData();
      console.log($store.state.global.users);
    });
  },
});
</script>
