import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product:object) {
    return this.db.list('/products').push(product);
  }
  getProduct(productId) {
    return this.db.object('/products/'+ productId);
  }
  getAll() {
    return this.db.list('/products');
  }
}
