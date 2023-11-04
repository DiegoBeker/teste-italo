const SESSION_KEY = 'session';

const SESSION_SERVICE = {
  saveSession: (session) => localStorage.setItem(SESSION_KEY, JSON.stringify(session)),
  removeSession: () => localStorage.removeItem(SESSION_KEY),
  getSession: () => JSON.parse(localStorage.getItem(SESSION_KEY)),
};

export { SESSION_SERVICE };
