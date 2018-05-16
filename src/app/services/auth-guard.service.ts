import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService,
              public router: Router) {
  }

  canActivate(): boolean {
    if (!this.auth.getToken()) {
      this.router.navigateByUrl('/log-in');
      return false;
    }
    return true;
  }

}
