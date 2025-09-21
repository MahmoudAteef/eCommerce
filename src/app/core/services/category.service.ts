import { Category, Response } from '../modals/data.interface';
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

export class CategortService{
    constructor(private http:HttpClient){}



    getAllCateogries({limit = 40 , page = 1} : PaginationParameters):Observable<Response<Category>>{
      return  this.http.get<Response<Category>>(`${environment.baseUrl}/categories?limit=${limit}&page=${page}`);
    }

        getSpecificCategory(id:string):Observable<{data:Category}>{
            return this.http.get<{data:Category}>(`${environment.baseUrl}/categories/${id}`);
        }
}