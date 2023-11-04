export function login({ state }, credentials) {
  console.log(credentials);
  console.log(state);
  const userExists = state.users.find((u) => u.login === credentials.login);
  if (userExists && userExists.senha.toString() === credentials.password) {
    alert('login');
    this.$router.push('/home');
  } else {
    alert('login ou senha errado');
  }
}
