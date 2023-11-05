const USER_KEY = 'users';

const USER_SERVICE = {
  saveUser: (user) => {
    const users = JSON.parse(localStorage.getItem(USER_KEY));
    users.push(user);
    localStorage.setItem(USER_KEY, JSON.stringify(users));
  },
  getUser: () => JSON.parse(localStorage.getItem(USER_KEY)),
};

export { USER_SERVICE };
