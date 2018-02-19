import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { RouterStateSnapshot, ActivatedRoute, Router } from '@angular/router';
import { AppUser } from '../models/app-user';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';


@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private afAuth : AngularFireAuth, private route: ActivatedRoute, private userService: UserService) {
    this.user$ = this.afAuth.authState;
  }

  get appUser$() : Observable<AppUser> {
        return this.user$.switchMap(user => {
          if(user) return this.userService.getUserData(user.uid);

          return Observable.of(null);
        });    
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
 
  logout() {
    this.afAuth.auth.signOut();
  }

}
 