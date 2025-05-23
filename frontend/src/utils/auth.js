export function isLoggedIn() {
    return !!localStorage.getItem('token');
  }
  
  export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  
  export function saveAuth(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  export function getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  