import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, RegisterData} from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule ,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  isLoading = false;
  registerForm = new FormGroup({
    name : new FormControl ('', [Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    email : new FormControl('', [Validators.required,Validators.email]),
    phone : new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}/)]),
    password : new FormControl('',[Validators.required,Validators.minLength(6),Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
    rePassword : new FormControl('',[Validators.required,Validators.minLength(6),Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
  },
{validators : this.matchPasswordValidation});


constructor(private authService : AuthService , private toaster : ToastrService ,private router : Router){}

  register(value : RegisterData){
    this.isLoading =true;
    this.authService.register(value).subscribe({
      next : (response) => {
            this.isLoading =false;
        console.log('Registeration Successful', response);
        localStorage.setItem('token',response.token);
        this.authService.decodedToken(response.token);
        this.toaster.success('Registeration Successful' , "Success")
        this.router.navigate(['/home']);
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
    console.log(this.registerForm.getError('notMatching'))
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }
  const values = this.registerForm.value as RegisterData;
  this.register(values);
  }

    matchPasswordValidation(group:AbstractControl) : null | Record<string , any>{
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    return password === rePassword ? null : { notMatching : {
      passwordValue : password,
      rePasswordValue : rePassword
    }};
  }

  get nameController(){
    return this.registerForm.get('name')
  }

    get emailController(){
    return this.registerForm.get('email')
  }

    get phoneController(){
    return this.registerForm.get('phone')
  }

    get passwordController(){
    return this.registerForm.get('password')
  }

    get rePasswordController(){
    return this.registerForm.get('rePassword')
  }



}
