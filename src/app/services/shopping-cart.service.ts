import { Injectable } from '@angular/core';
import { AngularFireDatabase} from 'angularfire2/database';
import { Product } from '../models/product';
import 'rxjs/add/operator/take';
@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  //creates a shopping cart object
  private createCart() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  //retrieves a shopping cart
  async getCart() {
    let cartId = await this.getOrCreateCartId()
    return this.db.object('shopping-carts/' + cartId);
  }
  
  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/'+ cartId + '/items/' + productId);
  }

  //Retrieves Cart Id from local storage. If none is found, it creates one using createCart() and sets the
  //cartId to the automated $key property for local storage, it then returns the newly created cartId 
  private async getOrCreateCartId(): Promise<string> {
      let cartId = localStorage.getItem('cartId');
      if (cartId) return cartId;

      if (!cartId) {
        let result = await this.createCart();
        localStorage.setItem('cartId', result.key);
        return result.key;
      } 
    }

    async removeFromCart(product: Product) {
      //we are not using 'await' here because we don't have to wait for a value to come back
      this.updateItemQuantity(product, -1);
    }

    //adds or updates a product's quantity to shoppingcart/items/productId
    async addToCart(product: Product) {
      this.updateItemQuantity(product, 1);
    }

    private async updateItemQuantity(product: Product, change: number) {
      let cartId = await this.getOrCreateCartId();
      let item$ = this.getItem(cartId, product.$key);
      
      item$.take(1).subscribe(item=> {
        //technique for getting rid of if/else: make statements identical, see below:

        // if (item.$exists()) item$.update({ quantity : item.quantity +1} );
        // else item$.set({product: product, quantity: 1})
        item$.update({
          product: product, 
          quantity: (item.quantity || 0) + change})
      })
    }
}
