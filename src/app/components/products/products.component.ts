import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Product } from '../../models/product';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products;
  filteredProducts: Product[];
  category: string;

  constructor( productService: ProductService, private route: ActivatedRoute ) {
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
}
