import { CartService } from './../../core/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../core/services/product.service';
import { Component } from '@angular/core';
import { Product } from '../../core/modals/data.interface';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartLoaderComponent } from "../../shared/components/cart-loader/cart-loader.component";

@Component({
  selector: 'app-product-detalis',
  imports: [CarouselModule, CartLoaderComponent],
  templateUrl: './product-detalis.component.html',
  styleUrl: './product-detalis.component.css'
})
export class ProductDetalisComponent {


  customOptions: OwlOptions = {
  loop: true,                
  autoplay: true,        
  autoplayTimeout: 3000,     
  autoplayHoverPause: true,  
  dots: true,                
  nav: false,                 
  navSpeed: 600,             
  mouseDrag: true,          
  touchDrag: true,           
  pullDrag: true,          
  responsive: {
    0: { items: 1 },        
    480: { items: 2 },       
    768: { items: 3 },       
    1024: { items: 4 },    
    1280: { items: 5 }       
  }
};


  product : Product | null = null;
  isLoading = false;
  constructor(private ProductService : ProductService,private route : ActivatedRoute, private CartService: CartService,private toaster : ToastrService){};



  ngOnInit():void{
    this.route.paramMap.subscribe(params=>{
      const id = params.get('id')
          if(id){
            this.getProductDetalis(id)
          }
    });
  }

  getProductDetalis(id:string){
    this.isLoading = true;
    this.ProductService.getSpecificProduct(id).subscribe({
      next : (response) => {
        this.isLoading = false;
        if(response.data){
          this.product = response.data;
        }
      },
    error : (error) =>{
              this.isLoading = false;
      console.log(error);
    }
    })
  }

  addProductCart(pID: string) {
  this.CartService.addProductToCart(pID).subscribe({
    next: (res) => {
      this.toaster.success(res.message);
    },
    error: (err) => {
      this.toaster.error(err.message);
    }
  });
}

}
