import { Brand, Response } from '../modals/data.interface';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment.development';

environment


@Injectable({
    providedIn:'root'
})

export class BrandService{
    constructor(private http:HttpClient){}

    getAllBrands():Observable<Response<Brand>>{
      return  this.http.get<Response<Brand>>(`${environment.baseUrl}/brands`);
    }

}