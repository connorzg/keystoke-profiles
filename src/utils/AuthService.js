import Auth0Lock from 'auth0-lock';
import { isTokenExpired } from './jwtHelper';

export default class AuthService {
  constructor(clientId, domain) {
    // Configure Auth0
    const options = {
      theme: {
        logo: 'https://pbs.twimg.com/profile_images/422524049239986176/JxdieGk5.png',
        primaryColor: "#31445d",
        foregroundColor: "#31445d"
      },
      languageDictionary: {
        title: "Keystoke Profiles"
      },
      auth: {
        responseType: 'token'
      }
    }

    this.lock = new Auth0Lock(clientId, domain, options);
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this));
    // binds login functions to keep this context
    this.login = this.login.bind(this);
  }

  _doAuthentication(authResult) {
    // Saves the user token
    this.setToken(authResult.idToken);
    location.reload();
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    return !!token && !isTokenExpired(token)
  }

  setToken(idToken) {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token');
  }

  logout() {
    // Clear user token and profile data from local storage
    localStorage.removeItem('id_token');
    location.reload();
  }
}
