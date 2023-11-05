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
    const users = JSON.parse(localStorage.getItem(USER_KEY));
    console.log(users);
    const loginExists = users.find((u) => u.login === user.login);
    console.log(loginExists);
    if (loginExists) {
      const updatedUsers = users.filter((u) => u.login !== user.login);
      console.log(updatedUsers);
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUsers));
    } else {
      localStorage.setItem(USER_KEY, JSON.stringify(users));
    }
  },
  getUser: () => JSON.parse(localStorage.getItem(USER_KEY)),
};

export { USER_SERVICE };
