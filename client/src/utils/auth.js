// import decode from 'jwt-decode';

// class AuthService {
//   getProfile() {
//     return decode(this.getToken());
//   }

//   loggedIn() {
//     // Checks if there is a saved token and it's still valid
//     const token = this.getToken();
//     return !!token && !this.isTokenExpired(token);
//   }

//   isTokenExpired(token) {
//     try {
//       const decoded = decode(token);
//       if (decoded.exp < Date.now() / 1000) { // Change 1000000000000000 to 1000
//         return true;
//       } else {
//         return false;
//       }
//     } catch (err) {
//       return false;
//     }
//   }

//   getToken() {
//     // Retrieves the user token from localStorage
//     return localStorage.getItem('id_token'); // Use localStorage instead of sessionStorage
//   }

//   login(idToken) {
//     // Saves user token to localStorage
//     localStorage.setItem('id_token', idToken); // Use localStorage instead of sessionStorage

//     // Use history.push('/') instead of window.location.assign('/') to navigate without full reload
//     window.location.assign('/');
//   }

//   logout() {
//     // Clear user token and profile data from localStorage
//     localStorage.removeItem('id_token'); // Use localStorage instead of sessionStorage

//     // Use history.push('/') instead of window.location.assign('/') to navigate without full reload
//     window.location.assign('/');
//   }
// }

// const authService = new AuthService();

// // Export the instance as the default module
// export default authService;
