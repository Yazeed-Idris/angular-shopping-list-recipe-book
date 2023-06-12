import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, tap, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Store} from "@ngrx/store";
import {AppState} from "../store/app.reducer";
import {login, logout} from "./store/auth.actions";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer;

  constructor(private http: HttpClient,
              private router: Router,
              private store: Store<AppState>) {
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
      {
        email,
        password,
        returnSecureToken: true,
      },
      {
        params: new HttpParams().set('key', environment.firebaseAPIKey)
      })
      .pipe(
        catchError(this.handleError),
        tap(this.handleAuth.bind(this)),
      )
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
      {
        email,
        password,
        returnSecureToken: true,
      },
      {
        params: new HttpParams().set('key', environment.firebaseAPIKey)
      })
      .pipe(
        catchError(this.handleError),
        tap(this.handleAuth.bind(this)),
      )
  }

  logout() {
   this.store.dispatch(logout())
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!'

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMessage)
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
    }
    return throwError(() => errorMessage);
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string,
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.store.dispatch(login({
        email: loadedUser.email,
        userId: loadedUser.id,
        token: loadedUser.token,
        expirationDate: new Date(userData._tokenExpirationDate)
      }))
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration)
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }

  private handleAuth(resData: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + (+resData.expiresIn * 1000));
    const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
    this.store.dispatch(login({
      email: resData.email,
      userId: resData.localId,
      token: resData.idToken,
      expirationDate: expirationDate,
    }))
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(+resData.expiresIn * 1000)
  }
}
