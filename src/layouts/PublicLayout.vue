<template>
    <q-layout view="hHh lpR fFf">

      <q-header elevated class="bg-secondary text-white" height-hint="98">
        <q-toolbar>
          <q-toolbar-title>
            <q-avatar>
              <q-img fit src="https://italo.com.br/wp-content/uploads/2021/02/versao_icone_institucional_negativo.jpg"/>
            </q-avatar>
            Italo
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container class="flex justify-center">
        <router-view />
      </q-page-container>

    </q-layout>
  </template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
  },

  setup() {
  },
});
</script>
