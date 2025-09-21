import { Component, Injectable, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  imports: [CommonModule],
  styleUrls: ['./wishlist.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class WishlistComponent implements OnInit {
  wishlist: any[] = [];
  isLoading = false;

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadWishlist();
  }

loadWishlist() {
  this.isLoading = true;
  this.wishlistService.getWishlist().subscribe({
    next: (res) => {
      this.wishlist = res.data.map((p: any) => ({ ...p, inWishlist: true }));
      this.isLoading = false;
    },
    error: (err) => {
      this.toastr.error(err.message || 'Failed to load wishlist');
      this.isLoading = false;
    }
  });
}


  toggleWishlist(productId: string, product: any) {
    if (product.inWishlist) {
      this.wishlistService.removeFromWishlist(productId).subscribe({
        next: (_res: any) => {
          product.inWishlist = false;
          this.wishlist = this.wishlist.filter(p => p._id !== productId);
          this.toastr.info('Removed from wishlist');
        },
        error: (err: any) => this.toastr.error(err?.message || 'Failed to remove')
      });
    } else {
      this.wishlistService.addToWishlist(productId).subscribe({
        next: (_res: any) => {
          product.inWishlist = true;
          this.toastr.success('Added to wishlist');
        },
        error: (err: any) => this.toastr.error(err?.message || 'Failed to add')
      });
    }
  }

  addProductCart(productId: string) {
    this.cartService.addProductToCart(productId).subscribe({
      next: (res: any) => this.toastr.success(res?.message || 'Added to cart'),
      error: (err: any) => this.toastr.error(err?.message || 'Failed to add to cart')
    });
  }
}
