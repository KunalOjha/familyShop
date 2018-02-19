import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppUser } from '../models/app-user';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  getUserData (uid:string): FirebaseObjectObservable<AppUser> {
    return this.db.object('/users/' + uid);
  }

  save(user) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    })
  }
}
