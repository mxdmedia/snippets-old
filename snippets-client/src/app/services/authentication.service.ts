import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const TOKEN_KEY = 'authToken';
const ACTIVE_USER_KEY = 'user';
const ACTIVE_USERNAME_KEY = 'username';

export interface ApiAuth {
  token: string;
  user: string;
  username: string;
}

export interface AuthStatus extends ApiAuth {
  authenticated: boolean;
  loginError: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authenticationState = new BehaviorSubject<AuthStatus>({
    authenticated: false,
    token: '',
    user: null,
    username: null,
    loginError: null
  });

  loginSub: Subscription;
  firstLoginSub: Subscription;

  constructor(private http: HttpClient) {
    this.checkStorage();
  }

  get authState(): Observable<AuthStatus> {
    return this.authenticationState.asObservable();
  }

  login(payload: { username: string; password: string }) {
    this.loginSub = this.http
      .post<ApiAuth>(`${environment.apiUrl}/api-token-auth/`, payload)
      .subscribe(
        data => {
          localStorage.setItem(TOKEN_KEY, data.token);
          localStorage.setItem(ACTIVE_USER_KEY, data.user);
          localStorage.setItem(ACTIVE_USERNAME_KEY, data.username);
          this.authenticationState.next({
            authenticated: true,
            loginError: null,
            ...data
          });
        },
        error => {
          this.authenticationState.next({
            authenticated: false,
            token: '',
            user: null,
            username: null,
            loginError: 'Incorrect Username or Password'
          });
          return null;
        }
      );
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ACTIVE_USER_KEY);
    localStorage.removeItem(ACTIVE_USERNAME_KEY);
    this.authenticationState.next({
      authenticated: false,
      token: '',
      user: null,
      username: null,
      loginError: 'You have been logged out.'
    });
  }

  checkStorage() {
    const token = localStorage.getItem(TOKEN_KEY);
    const user = localStorage.getItem(ACTIVE_USER_KEY);
    const username = localStorage.getItem(ACTIVE_USERNAME_KEY);

    if (token && user) {
      const state: AuthStatus = {
        authenticated: true,
        token,
        user,
        username,
        loginError: ''
      };
      this.authenticationState.next(state);
    } else {
      const state: AuthStatus = {
        authenticated: false,
        token: '',
        user: null,
        username: null,
        loginError: null
      };
      this.authenticationState.next(state);
    }
  }
}
