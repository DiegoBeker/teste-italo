import { SESSION_SERVICE } from 'src/services/session';
import { USER_SERVICE } from 'src/services/user';

export const initUsers = (state) => {
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
    state.users = data;
  } else {
    const unserializedData = JSON.parse(storedData);
    state.users = unserializedData;
  }
};
export const updateUsers = (state, data) => {
  state.users = data;
};

export const createUser = (state, data) => {
  USER_SERVICE.saveUser(data);
  initUsers(state);
};

export const updateSession = (state, session) => {
  state.session = session;
  SESSION_SERVICE.saveSession(session);
};

export const removeSession = (state) => {
  state.session = undefined;
  SESSION_SERVICE.removeSession();
};
