/* eslint-disable no-alert */
const USER_KEY = 'users';

const USER_SERVICE = {
  saveUser: (user) => {
    const users = JSON.parse(localStorage.getItem(USER_KEY));
    const loginExists = users.find((u) => u.login === user.login);
    if (loginExists) {
      alert('Usuário já existe');
      return;
    }
    users.push(user);
    localStorage.setItem(USER_KEY, JSON.stringify(users));
  },
  deleteUser: (user) => {
    if (user.login === 'admin') {
      alert('Não é possível excluir o usuario administrador');
      return;
    }

    const users = JSON.parse(localStorage.getItem(USER_KEY));

    const loginExists = users.find((u) => u.login === user.login);

    if (loginExists) {
      const updatedUsers = users.filter((u) => u.login !== user.login);
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUsers));
    } else {
      localStorage.setItem(USER_KEY, JSON.stringify(users));
    }
  },
  getUser: () => JSON.parse(localStorage.getItem(USER_KEY)),
  updateUser: (payload) => {
    const { user, userToEdit } = payload;
    const users = JSON.parse(localStorage.getItem(USER_KEY));

    const userExists = users.find((u) => u.login === userToEdit.login);

    if (userExists) {
      userExists.nome = user.nome;
      userExists.login = user.login;
      userExists.password = user.password;
      userExists.grupo = user.grupo;
      localStorage.setItem(USER_KEY, JSON.stringify(users));
    }
  },
};

export { USER_SERVICE };
