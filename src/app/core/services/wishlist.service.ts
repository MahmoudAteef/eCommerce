import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient) {}

addToWishlist(productId: string): Observable<any> {
  return this.http.post(
    `${environment.baseUrl}/wishlist`,
    { productId },
    {
      headers: {
        token: localStorage?.getItem('token') || ''
      }
    }
  );
}

removeFromWishlist(productId: string): Observable<any> {
  return this.http.delete(
    `${environment.baseUrl}/wishlist/${productId}`,
    {
      headers: { token: localStorage?.getItem('token') || '' }
    }
  );
}



  getWishlist(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/wishlist`, 
      { headers: { token: localStorage.getItem('token') || '' } }
    );
  }
}
