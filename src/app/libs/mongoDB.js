const USER_LOCAL_KEY = "EW_userMe";

export function getAuthuser() {
  let user = localStorage.getItem(USER_LOCAL_KEY);
  return JSON.parse(user);
}

export function setAuthuser(user) {
  return localStorage.setItem(USER_LOCAL_KEY, JSON.stringify(user));
}

export function checkAuthuser() {
  return localStorage.getItem(USER_LOCAL_KEY);
}

export function removeAuthuser() {
  return localStorage.removeItem(USER_LOCAL_KEY);
}
