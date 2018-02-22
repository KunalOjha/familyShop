import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{
  products;
  filteredProducts: Product[];
  category: string;
  cart;
  subscription: Subscription;

  constructor( productService: ProductService, private route: ActivatedRoute, private shoppingCartService: ShoppingCartService ) {
    productService
      .getAll()
      .switchMap(products => {
        this.products = products;
        return route.queryParamMap
      })
      .subscribe(params => {
          this.category = params.get('category');
    
          this.filteredProducts = (this.category) ?
            this.products.filter(p => p.category === this.category) :
            this.products;
          });
    }

    async ngOnInit() {
      this.subscription = (await this.shoppingCartService.getCart()).subscribe(cart => {
        this.cart = cart;
        console.log('items', cart);
      })
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

}
