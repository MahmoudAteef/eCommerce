import { CategortService } from './../../core/services/category.service';
import { ProductService } from './../../core/services/product.service';
import { WishlistService } from './../../core/services/wishlist.service';
import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { Category, Product } from '../../core/modals/data.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { FilterListPipe } from '../../shared/pipes/filter-list-pipe';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [ProductCardComponent, CarouselModule, FilterListPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  term: string = '';
  isLoading = false;
  products: Product[] = [];
  categories: Category[] = [];
  wishlistIds: string[] = [];

  constructor(
    private ProductService: ProductService,
    private CategortService: CategortService,
    private wishlistService: WishlistService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadWishlistAndProducts();
    this.getAllCategories();
  }

  loadWishlistAndProducts() {
    this.wishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlistIds = res.data.map((p: any) => p._id);

        this.getAllProducts();
      },
      error: (err) => this.toaster.error(err.message || 'Failed to load wishlist')
    });
  }

  getAllProducts() {
    this.isLoading = true;
    this.ProductService.getAllProducts({}).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.products = response.data.map((p: Product) =>
          Object.assign({}, p, { inWishlist: this.wishlistIds.includes(p._id) })
        );

      },
      error: (error) => {
        this.isLoading = false;
        console.error(error);
      },
    });
  }

  getAllCategories() {
    this.isLoading = true;
    this.CategortService.getAllCateogries({}).subscribe({
      next: (res) => {
        this.categories = res.data;
        this.isLoading = false;
      },
      error: (err) => this.isLoading = false
    });
  }

  customOptions: OwlOptions = {
    autoplay: true,
    autoplayTimeout: 3000,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 500,
    nav: false,
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 7 }
    },
    margin: 10,
  }
}
