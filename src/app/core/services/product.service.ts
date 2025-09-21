import { Product, Response } from '../modals/data.interface';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment.development';

environment

interface PaginationParameters{
    limit ?: number , page ?: number
}

@Injectable({
    providedIn:'root'
})

export class ProductService{
    constructor(private http:HttpClient){}



    getAllProducts({limit = 40 , page = 1} : PaginationParameters):Observable<Response<Product>>{
      return  this.http.get<Response<Product>>(`${environment.baseUrl}/products?limit=${limit}&page=${page}`);
    }

        getSpecificProduct(id:string):Observable<{data:Product}>{
            return this.http.get<{data:Product}>(`${environment.baseUrl}/products/${id}`);
        }
}