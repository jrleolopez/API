export function setToken(token) {
  //localStarage.setItem("token", token)
  sessionStorage.setItem("token", token);
}

export function getToken() {
  return sessionStorage.getItem("token");
}

export function clearToken() {
  sessionStorage.removeItem("token");
}
