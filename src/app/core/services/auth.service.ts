import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { jwtDecode } from "jwt-decode";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment.development";


environment


export type RegisterData={
      name : string; 
        email : string;
        phone : string;
        password : string;
        rePassword : string;
}

export type LoginData={
        email : string;
        password : string;
}



@Injectable({
    providedIn:'root'
})

export class AuthService{
    isLogin = new BehaviorSubject<boolean>(false);


    constructor(private http:HttpClient,private router : Router ){
   const token = localStorage.getItem("token");
    if (token) {
      this.decodedToken(token);
    }
    }


    register(data:RegisterData): Observable<any>{
        return this.http.post(`${environment.baseUrl}/auth/signup`,data);
    }

    login(data:LoginData): Observable<any>{
        return this.http.post(`${environment.baseUrl}/auth/signin`,data);
    }

    forgotPassword(data:{email : string}): Observable<any>{
        return this.http.post(`${environment.baseUrl}/auth/forgotPasswords`,data);
    }

    verifyCode(data:{resetCode : string}): Observable<any>{
        return this.http.post(`${environment.baseUrl}/auth/verifyResetCode`,data);
    }

   resetPassword(data:{email : string , newPassword : string}): Observable<any>{
        return this.http.put(`${environment.baseUrl}/auth/resetPassword`,data);
    }


    decodedToken(token : string){
        const decoded = jwtDecode(token);
        console.log(decoded);
            if((decoded as any).id){
                this.isLogin.next(true);
            }
    }

    logOut(){
        this.isLogin.next(false);
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

}