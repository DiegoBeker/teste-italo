/* eslint-disable no-alert */
import { v4 as uuid } from 'uuid';

export function login({ state, commit }, credentials) {
  const userExists = state.users.find((u) => u.login === credentials.login);

  if (userExists && userExists.senha.toString() === credentials.password) {
    const token = uuid();
    const session = { nome: userExists.nome, token };

    commit('updateSession', session);

    this.$router.push('/home');
  } else {
    alert('login ou senha errado');
  }
}

export function logout({ commit }) {
  commit('removeSession');
  this.$router.push('/');
}

export function createUser({ commit }, user) {
  commit('createUser', user);
}

export function updateUser({ commit }, payload) {
  commit('updateUser', payload);
}

export function deleteUser({ commit }, user) {
  commit('deleteUser', user);
}
