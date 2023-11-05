<!-- eslint-disable max-len -->
<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-table
        title="Manage Users"
        :rows="data"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="nome"
        :grid="mode == 'grid'"
        :filter="filter"
        v-model:pagination="pagination"
      >
        <template v-slot:top-right="props">
          <q-btn
            @click="addUser()"
            flat
            size="lg"
            color="primary"
            icon="add_circle"
            class="q-mr-xs q-pa-none"
          />

          <q-input
            dense
            borderless
            v-model="filter"
            placeholder="Search"
            class="custom-border bg-grey-3 q-pl-sm"
            style="border-radius: 10px"
          >
            <template v-slot:append>
              <q-icon class="q-pr-sm" color="grey-8" name="search" />
            </template>
          </q-input>

          <q-toggle
            v-model="viewToggle"
            @click="
              mode = mode === 'grid' ? 'list' : 'grid';
              separator = mode === 'grid' ? 'none' : 'horizontal';"
            v-if="!props.inFullscreen"
          >
            <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
              >{{ mode === "grid" ? "List View" : "Grid View" }}
            </q-tooltip>
          </q-toggle>

        </template>

        <template v-slot:body-cell-grupo="props">
          <q-td :props="props">
            <q-chip
              :color="(props.row.grupo == 'administrador' ? 'green' : 'orange')"
              text-color="white"
              dense
              class="q-px-md"
              square
              style="width: 85px"
            >{{props.row.grupo === 'administrador' ? 'admin' : props.row.grupo}}
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div class="q-gutter-sm">
              <q-btn dense outline size="sm" color="primary" icon="edit" @click="editRow(props.row)" />
              <q-btn dense outline size="sm" color="primary" icon="visibility" @click="openModal(props.row)" />
              <q-btn dense outline size="sm" color="red" icon="delete" @click="deleteUser(props.row)"/>
            </div>
          </q-td>
        </template>
      </q-table>
    </q-card>
    <q-dialog v-model="addEditUser" :maximized="$q.platform.is.mobile">
      <q-card :style="{'width': '500px', 'max-width': '50vw', 'height': '500px'}">
        <q-card-section>
          <div class="text-h6 q-px-md">
            {{ addFlag ? 'Add User' : 'Edit User' }}
            <q-btn
              round
              flat
              dense
              icon="close"
              class="float-right"
              color="grey-8"
              v-close-popup
            ></q-btn>
          </div>
        </q-card-section>
        <q-separator class="q-px-md" inset></q-separator>
        <q-card-section class="q-pt-md">
          <q-form class="q-gutter-md" @submit.prevent="submit">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Nome</q-item-label>
                  <q-input
                    dense
                    outlined
                    v-model="user.nome"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Login</q-item-label>
                  <q-input
                    dense
                    outlined
                    v-model="user.login"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Senha</q-item-label>
                  <q-input
                    dense
                    outlined
                    v-model="user.senha"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Grupo</q-item-label>
                  <q-input
                    dense
                    outlined
                    v-model="user.grupo"
                  />
                </q-item-section>
              </q-item>
          </q-list>
            <div class="q-px-md q-pt-sm">
              <q-btn class="full-width" label="Save" type="submit" color="secondary" v-close-popup />
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-teal">
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="viewUser">
      <q-card class="q-pa-md" :style="$q.platform.is.desktop ? {'width': '600px', 'max-width': '60vw'} : {'width': '100%'}">
        <div class="row full-width">

        <div class="q-ml-md q-gutter-md">
          <div class="row">
            <span class="text-weight-bold">Nome:</span> <span class="text-grey-8 q-ml-sm"> {{selectedUser.nome}}</span>
          </div>
          <div class="row">
            <span class="text-weight-bold">Login:</span> <span class="text-grey-8 q-ml-sm"> {{selectedUser.login}}</span>
          </div>
          <div class="row">
            <span class="text-weight-bold">Grupo:</span> <span class="text-grey-8 q-ml-sm"> {{selectedUser.grupo}}</span>
          </div>
        </div>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { SESSION_SERVICE } from 'src/services/session';
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { mapState, mapActions } from 'vuex';

export default defineComponent({
  name: 'CustomerManagement',

  setup() {
    const session = SESSION_SERVICE.getSession();
    const router = useRouter();

    if (!session) router.push('/');

    return {
      viewToggle: ref(false),
      filter: ref(''),
      user: ref({}),
      userToEdit: ref({}),
      addEditUser: ref(false),
      addFlag: ref(true),
      viewUser: ref(false),
      selectedUser: ref({}),
      mode: ref('list'),
      columns: ref([
        {
          name: 'nome',
          required: true,
          label: 'Nome',
          align: 'left',
          field: 'nome',
          sortable: true,
        },
        {
          name: 'login',
          align: 'left',
          label: 'Login',
          field: 'login',
          sortable: true,
        },
        {
          name: 'grupo',
          align: 'left',
          label: 'Grupo',
          field: 'grupo',
          sortable: true,
        },
        {
          name: 'action',
          align: 'left',
          label: 'Action',
          field: 'action',
          sortable: true,
        },
      ]),
      pagination: ref({
        rowsPerPage: 10,
      }),
    };
  },

  computed: {
    ...mapState({ data: (state) => state.global.users }),
  },

  methods: {
    ...mapActions({
      createUser: 'global/createUser',
      delete: 'global/deleteUser',
      updateUser: 'global/updateUser',
    }),
    openModal(val) {
      const self = this;
      self.selectedUser = val;
      self.viewUser = true;
    },
    addUser() {
      const self = this;
      self.user = {};
      self.addFlag = true;
      self.addEditUser = true;
    },
    editRow(val) {
      const self = this;
      self.user = JSON.parse(JSON.stringify(val));
      self.userToEdit = JSON.parse(JSON.stringify(val));
      self.addFlag = false;
      self.addEditUser = true;
    },
    submit() {
      const self = this;
      if (self.addFlag) {
        self.createUser(self.user);
      } else {
        const { userToEdit, user } = self;
        const payload = { userToEdit, user };
        self.updateUser(payload);
      }
    },
    deleteUser(val) {
      const self = this;

      // eslint-disable-next-line no-restricted-globals
      if (confirm('Deseja realmente excluir este item?')) {
        self.delete(val);
      } else {
        console.log(val);
      }
    },
  },
});
</script>

<style scoped>
.custom-border {
  border-radius: 5px;
}
</style>
