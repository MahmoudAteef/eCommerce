import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { CartResponse } from '../../core/modals/data.interface';
import { ToastrService } from 'ngx-toastr';
import { CartLoaderComponent } from '../../shared/components/cart-loader/cart-loader.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [CartLoaderComponent , ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  cartData: CartResponse | null = null;
  currentIndex :number = -1;
  isLoading = false;
  updateLoading =false;
  isAddressFormOpen = false;
  addressForm = new FormGroup({
    details : new FormControl ('',Validators.required),
    phone : new FormControl ('',Validators.required),
    city : new FormControl ('',Validators.required),

  });
  
  private cartService =inject(CartService);
  private toaster = inject(ToastrService)


  ngOnInit(): void {
    this.getUserCart();
  
  }

  getUserCart(){
    this.isLoading = true;
    this.cartService.getUserCart().subscribe({
      next :(res) => {
        this.isLoading = false;
        this.cartData =res;
      },
      error:(err) => {
        this.isLoading = false;
        this.toaster.error(err.message);
      }
    })
  }


  updateProductCount(id : string , count : number , currentIndex : number){
    this.currentIndex = currentIndex
    this.updateLoading = true;
    this.cartService.updateProductQuantity(id,count).subscribe({
      next : (res) =>{
        console.log(res);
            this.updateLoading = false;
        this.cartData = res;
      },
      error : (err) => {
            this.updateLoading = false;
        this.toaster.error(err.error)
      }

    })
  }

  deleteProduct(id:string){
    this.cartService.deleteSpecificProduct(id).subscribe({
      next : (res) =>{
        console.log(res);
        this.cartData = res;
      },
      error : (err) =>{
        this.toaster.error(err.message)
      }
    })
  }


  clearCart(){

    this.cartService.deleteCart().subscribe({
      next : (res) => {
        console.log(res)
        this.cartData = null;
      },
      error : (err) => {
        this.toaster.error(err.message)
      }
    })
  }

  checkoutSession(){
    if(!this.cartData?.cartId)return;
    if(this.addressForm.invalid){
      this.addressForm.markAllAsTouched();
      return;
    }
    this.cartService.checkoutSession(this.cartData?.cartId,{
      details : this.addressForm.value.details!,
      phone : this.addressForm.value.phone!,
      city : this.addressForm.value.city!
    }).subscribe({
      next : (res) => {
        console.log(res);
        window.location.href =  res.session.url;
      },
      error : (err) =>{
        this.toaster.error(err.message);  
      }


    })
  }

}
