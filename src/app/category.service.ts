import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

   getAll(): FirebaseListObservable<any> {
    return this.db.list('/categories/', {
      query: {
        orderByChild: 'name'
      }
    });
  }
}
