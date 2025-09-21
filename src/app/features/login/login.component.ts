import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, LoginData } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isLoading = false;
// private authService = inject(AuthService);
// private toaster = inject(ToastrService);

  loginForm = new FormGroup({
    email : new FormControl('', [Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z@0-9]{5,10}$/)]),
  });


constructor(
  private authService : AuthService , 
  private toaster : ToastrService ,private Router : Router){}

  login(value : LoginData){
    this.isLoading =true;
    this.authService.login(value).subscribe({
      next : (response) => {
            this.isLoading =false;
        console.log('Login Successful', response);
                localStorage.setItem('token',response.token);
                this.authService.decodedToken(response.token);
        this.toaster.success('Login Successful' , "Success")
                                  this.Router.navigate(['/home']);
      },
      error: (error) =>{
            this.isLoading =false;
        console.error('Registeration Failed' , error);
        if(error?.error.message){
                          this.toaster.error(error.error.message,'Error')
        }
      }
    })
  }


  hundleSubmit(){
    console.log(this.loginForm.getError('notMatching'))
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }
  const values = this.loginForm.value as LoginData;
  this.login(values);
  }

  

    get emailController(){
    return this.loginForm.get('email')
  }


    get passwordController(){
    return this.loginForm.get('password')
  }




}
