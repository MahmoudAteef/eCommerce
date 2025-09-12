import { initFlowbite } from 'flowbite';
import { FlowbiteService } from './../../../core/services/flowbite.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  pages:{title:string,path:string}[]=[
    {path:'home',title:'Home'},
    {path:'products',title:'Products'},
    {path:'categoires',title:'Categoires'},
    {path:'brands',title:'Brands'},
    {path:'cart',title:'Cart'}
  ]

    authPages:{title:string,path:string}[]=[
    {path:'login',title:'Login'},
    {path:'register',title:'Register'},
  ]
    constructor(private FlowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  logOut(){

  }

}
