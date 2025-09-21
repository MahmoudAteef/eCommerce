import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
step = 1;

private toaster = inject(ToastrService);
private authService = inject(AuthService);
private router = inject(Router);


forgotPasswordGroup = new FormGroup({
  email : new FormControl('', [Validators.required, Validators.email])
});

verifyResetCodeGroup = new FormGroup({
  resetCode : new FormControl('', [Validators.required, Validators.minLength(6)])
});


resetPasswordGroup = new FormGroup({
  email : new FormControl('', [Validators.required, Validators.email]),
  newPassword : new FormControl('', [Validators.required, Validators.minLength(6),Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)])

});

hundleSubmitForgotPassword(){
  if(this.forgotPasswordGroup.invalid){
    this.forgotPasswordGroup.markAllAsTouched();
    return;
  }
  this.forgotPasswordGroup.value.email;
  this.resetPasswordGroup.get('email')?.patchValue(this.forgotPasswordGroup.value.email || '');
  this.authService.forgotPassword({email : this.forgotPasswordGroup.value.email!}).subscribe({
    next:(res) => {
  this.step =2
    },
    error: (err) => {
      this.toaster.error(err.message,'', {timeOut:1500})
    }
  })
}

hundleSubmitVerifyResetCode(){
    if(this.verifyResetCodeGroup.invalid){
    this.verifyResetCodeGroup.markAllAsTouched();
    return;
  }

  this.authService.verifyCode({resetCode : this.verifyResetCodeGroup.value.resetCode!}).subscribe({
    next:(res) => {
  this.step =3
    },
    error: (err) => {
      this.toaster.error(err.message,'', {timeOut:1500})
    }
  })
}

hundleSubmitResetPassword(){
    if(this.resetPasswordGroup.invalid){
    this.resetPasswordGroup.markAllAsTouched();
    return;
  }
    this.authService.resetPassword({email : this.resetPasswordGroup.value.email!,newPassword : this.resetPasswordGroup.value.newPassword!}).subscribe({
    next:(res) => {
  this.toaster.success('Password Reset Successfully','',{timeOut:1500});
  localStorage.setItem('token',res.token);
  this.authService.decodedToken(res.token);
  this.router.createUrlTree(['/login'])
    },
    error: (err) => {
      this.toaster.error(err.message,'', {timeOut:1500})
    }
  })
  
}
}
