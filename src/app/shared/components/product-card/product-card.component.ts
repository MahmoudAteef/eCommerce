import { CartService } from './../../../core/services/cart.service';
import { WishlistService } from './../../../core/services/wishlist.service'; 
import { Component, Input } from '@angular/core';
import { Product } from '../../../core/modals/data.interface';
import { RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'], 
})
export class ProductCardComponent {
  @Input()
  product: Product = {} as Product;
  wishlistIds: string[] = [];

  constructor(
    private cartService: CartService,
    private wishlistService: WishlistService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
  if (this.product && this.product._id) {
    this.product.inWishlist = this.product.inWishlist || false;
  }
}


  addProductCart(pID: string) {
    this.cartService.addProductToCart(pID).subscribe({
      next: (res) => {
        console.log(res.message);
        this.toaster.success(res.message);
      },
      error: (err) => {
        this.toaster.error(err.message);
      }
    });
  }

toggleWishlist(productId: string, product: Product) {
  if (product.inWishlist) {
    this.wishlistService.removeFromWishlist(productId).subscribe({
      next: () => {
        product.inWishlist = false;
        this.wishlistIds = this.wishlistIds.filter(id => id !== productId);
        this.toaster.success('Product removed from wishlist');
      },
      error: (err) => this.toaster.error(err.message)
    });
  } else {
    this.wishlistService.addToWishlist(productId).subscribe({
      next: () => {
        product.inWishlist = true;
        this.wishlistIds.push(productId);
        this.toaster.success('Product added to wishlist');
      },
      error: (err) => this.toaster.error(err.message)
    });
  }
}


}
