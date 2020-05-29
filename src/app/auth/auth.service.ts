import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UserAvailableResponse {
  available: boolean;
}

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SigninCredentials {
  username: string;
  password: string;
}

interface SignupResponse {
  username: string;
}

interface AuthCheckResponse {
  authenticated: boolean;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http
      .post<UserAvailableResponse>(`${this.rootUrl}/auth/username`, {
        username
      });
  }

  signup(credentials: SignupCredentials) {
    return this.http
      .post<SignupResponse>(`${this.rootUrl}/auth/signup`,
        credentials
      ).pipe(
        tap(() => {
          this.signedin$.next(true);
        })
      );
  }

  checkAuth() {
    return this.http.get<AuthCheckResponse>(`${this.rootUrl}/auth/signedin`)
      .pipe(
        tap(({ authenticated }) => {
          this.signedin$.next(authenticated);
        })
      );
  }

  signOut() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {})
      .pipe(
        tap(() => {
          this.signedin$.next(false);
        })
      );
  }

  signIn(credentials: SigninCredentials) {
    return this.http.post(`${this.rootUrl}/auth/signin`, credentials)
      .pipe(
        tap(() => {
          this.signedin$.next(true);
        })
      );

  }
}
