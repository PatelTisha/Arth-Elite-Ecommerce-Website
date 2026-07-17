// auth.js — Aura Elite Authentication System

const Auth = (() => {
  const USERS_KEY = 'aura_users';
  const ACTIVE_USER_KEY = 'aura_active_user';

  function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function getActiveUser() {
    return JSON.parse(localStorage.getItem(ACTIVE_USER_KEY) || 'null');
  }

  function isLoggedIn() {
    return getActiveUser() !== null;
  }

  function register(name, email, password) {
    const users = getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: 'This email is already registered. Please sign in.' };
    }
    const newUser = { id: Date.now(), name, email: email.toLowerCase(), password };
    users.push(newUser);
    saveUsers(users);
    return { success: true, message: 'Account created successfully! Please sign in.' };
  }

  function login(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) {
      return { success: false, message: 'Invalid credentials. Please check your email and password.' };
    }
    const activeUser = { id: user.id, name: user.name, email: user.email };
    localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(activeUser));
    return { success: true, message: `Welcome back, ${user.name}!`, user: activeUser };
  }

  function logout() {
    localStorage.removeItem(ACTIVE_USER_KEY);
    updateNavAuth();
    window.location.href = 'index.html';
  }

  function updateNavAuth() {
    const user = getActiveUser();
    const loginLinks = document.querySelectorAll('.nav-login-link');
    loginLinks.forEach(link => {
      if (user) {
        link.textContent = 'Logout';
        link.href = '#';
        link.onclick = (e) => { e.preventDefault(); logout(); };
      } else {
        link.textContent = 'Login';
        link.href = 'login.html';
        link.onclick = null;
      }
    });
    const userGreets = document.querySelectorAll('.nav-user-greet');
    userGreets.forEach(el => {
      el.textContent = user ? `Hi, ${user.name.split(' ')[0]}` : '';
      el.style.display = user ? 'inline' : 'none';
    });
  }

  function requireAuth(redirectUrl) {
    if (!isLoggedIn()) {
      const returnUrl = redirectUrl || window.location.href;
      window.location.href = `login.html?return=${encodeURIComponent(returnUrl)}`;
      return false;
    }
    return true;
  }

  return { getUsers, getActiveUser, isLoggedIn, register, login, logout, updateNavAuth, requireAuth };
})();

document.addEventListener('DOMContentLoaded', () => {
  Auth.updateNavAuth();
});
