import { v4 as uuid } from 'uuid';

export function login({ state, commit }, credentials) {
  const userExists = state.users.find((u) => u.login === credentials.login);

  if (userExists && userExists.senha.toString() === credentials.password) {
    const token = uuid();
    const session = { ...userExists, token };
    delete session.password;

    commit('updateSession', session);

    this.$router.push('/home');
  } else {
    alert('login ou senha errado');
  }
}
