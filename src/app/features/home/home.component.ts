import { ProductService } from './../../core/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { error } from 'console';
import { Product } from '../../core/modals/api.interface';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {


  isLoading=false;
  products : Product[] =[];
  constructor(private ProductService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this.isLoading=true;
    this.ProductService.getAllProducts({}).subscribe({
      next: (response) => {
        this.isLoading=false;
        console.log(response.data);
        this.products=response.data;
      },
      error: (error) => {
        this.isLoading=false;
        console.error(error);
      },
    });
  }
}
