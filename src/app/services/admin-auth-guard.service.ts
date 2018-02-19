import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/map';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AdminAuthGuard implements CanActivate {
    admin$;
    constructor(private authService: AuthService, private userService: UserService) {}

    canActivate(): Observable<boolean> { 
      return this.authService.appUser$
        .map(appUser => appUser.isAdmin);
    }

}