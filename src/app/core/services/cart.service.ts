import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { Observable , BehaviorSubject , tap } from "rxjs";
import { CartResponse } from "../modals/data.interface";

environment

@Injectable({
    providedIn:'root'
})

export class CartService{
  private _cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this._cartCount.asObservable();
    
    constructor(private http:HttpClient){
            this.loadCartCount();

    }

      private loadCartCount() {
    this.getUserCart().subscribe({
      next: (res) => this._cartCount.next(res.numOfCartItems || 0),
      error: () => this._cartCount.next(0)
    });
  }

   addProductToCart(productId: string): Observable<any> {
  return this.http.post(`${environment.baseUrl}/cart`, { productId }, {
    headers: { token: localStorage?.getItem('token') || '' }
  }).pipe(
    tap(() => this.loadCartCount())
  );
}

    refreshCartCount() {
      this.getUserCart().subscribe(); // ستحصل على العدد الجديد
    }



    updateProductQuantity(productId : string ,count : number) : Observable<CartResponse>{
      return  this.http.put<CartResponse>(`${environment.baseUrl}/cart/${productId}`,{count}, {
            headers : {
                token : localStorage?.getItem('token') || ''
            }
        })
    }


    deleteSpecificProduct(productId : string) : Observable<CartResponse>{
      return  this.http.delete<CartResponse>(`${environment.baseUrl}/cart/${productId}`, {
            headers : {
                token : localStorage?.getItem('token') || ''
            }
        })
    }


    deleteCart() : Observable<any>{
      return  this.http.delete(`${environment.baseUrl}/cart`, {
            headers : {
                token : localStorage?.getItem('token') || ''
            }
        })
    }


    getUserCart() : Observable<CartResponse>{
      return  this.http.get<CartResponse>(`${environment.baseUrl}/cart`, {
            headers : {
                token : localStorage?.getItem('token') || ''
            }
        })
    }

    checkoutSession(cart_id : string,shippingAddress : {details : string ,phone : string , city : string} ): Observable<{session : {url:string}}>{
      return  this.http.post<{session : {url:string}}>(`${environment.baseUrl}/orders/checkout-session/${cart_id}?url=${environment.frontUrl}`,{
        shippingAddress : shippingAddress
      } ,{
            headers : {
                token : localStorage?.getItem('token') || ''
            }
        })
    }



}


