import { Response } from './../modals/api.interface';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


interface PaginationParameters{
    limit ?: number , page ?: number
}

@Injectable({
    providedIn:'root'
})

export class ProductService{
    constructor(private http:HttpClient){}

    getAllProducts({limit = 40 , page = 1} : PaginationParameters):Observable<Response>{
      return  this.http.get<Response>('https://ecommerce.routemisr.com/api/v1/products?limit=${limit}&page=${page}');
    }
}