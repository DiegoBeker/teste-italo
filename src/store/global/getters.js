export function getUsers(state) {
  return state.users;
}

export function findUserByLogin(state, login) {
  return state.users.find((u) => u.login === login);
}
