import { AuthService } from './core/services/auth.service';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected title = 'eCommerce';
  private authService = inject(AuthService);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void{
    console.log('hey')
    if(isPlatformBrowser(this.platformId)){
    const token = localStorage.getItem('token')
    if(token){
          this.authService.decodedToken(token)
    }
    }
  }
}
