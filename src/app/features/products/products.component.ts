import { WishlistService } from './../../core/services/wishlist.service';
import { Component } from '@angular/core';
import { Product } from '../../core/modals/data.interface';
import { ProductService } from '../../core/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { FilterListPipe } from '../../shared/pipes/filter-list-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  imports: [ProductCardComponent, FilterListPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductComponent {
  term: string = '';
  isLoading = false;
  products: Product[] = [];
  wishlistIds: string[] = [];
  constructor(
    private ProductService: ProductService,
    private toaster: ToastrService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.loadWishlistAndProducts();
  }

  loadWishlistAndProducts() {
    this.wishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlistIds = res.data.map((p: any) => p._id);

        this.getAllProducts();
      },
      error: (err) =>
        this.toaster.error(err.message || 'Failed to load wishlist'),
    });
  }

  getAllProducts() {
    this.isLoading = true;
    this.ProductService.getAllProducts({}).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log(response.data);
        this.products = response.data.map((p: Product) => ({
          ...p,
          inWishlist: this.wishlistIds.includes(p._id),
        }));
      },
      error: (error) => {
        this.isLoading = false;
        console.error(error);
      },
    });
  }
}
