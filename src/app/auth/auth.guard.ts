import {Router, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {map, Observable, take} from "rxjs";
import {AuthService} from "./auth.service";
import {AppState} from "../store/app.reducer";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) {
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select('auth')
      .pipe(
        take(1),
        map(state => state.user),
        map((user) => {
          const isAuth = !!user;
          if (isAuth) {
            return true;
          }
          return this.router.createUrlTree(['/auth'])
        })
      );
  }


}
