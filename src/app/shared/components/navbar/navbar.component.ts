import { CartService } from './../../../core/services/cart.service';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from './../../../core/services/flowbite.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  cartCount=0;
  localIsLogin = false;  
  isLogin = false;

  pages:{title:string,path:string}[]=[
    {path:'home',title:'Home'},
    {path:'products',title:'Products'},
    {path:'categories',title:'Categories'},
    {path:'brands',title:'Brands'},
    {path:'wishlist',title:'Wishlist'}
  ]

    authPages:{title:string,path:string}[]=[
    {path:'/login',title:'Login'},
    {path:'/register',title:'Register'},
  ]
    constructor(private FlowbiteService: FlowbiteService, private authService : AuthService,private cartService: CartService) {
          authService.isLogin.subscribe({
            next:(isLogin) => {
              console.log({isLogin} ,'navbar')
              this.localIsLogin = isLogin;
            }
    })
    }
ngOnInit(): void {
  this.FlowbiteService.loadFlowbite((flowbite) => {
    initFlowbite();
  });

  this.cartService.cartCount$.subscribe(count => {
    this.cartCount = count;
  });

  this.cartService.getUserCart().subscribe();
}

logOut() {
  this.authService.logOut();
}

}