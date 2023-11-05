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
  getUser: () => JSON.parse(localStorage.getItem(USER_KEY)),
};

export { USER_SERVICE };
