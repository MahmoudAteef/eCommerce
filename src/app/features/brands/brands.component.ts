import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from '../../core/modals/data.interface';
import { BrandService } from '../../core/services/brand.service';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit {

  term : string = '';

  isLoading=false;
  brands : Brand[] =[];
  constructor(private BrandService: BrandService , private toaster : ToastrService) {}

  ngOnInit(): void {
    this.getAllBrands();
  }
 

  getAllBrands() {
    this.isLoading=true;
    this.BrandService.getAllBrands().subscribe({
      next: (res) => {
        this.brands = res.data
      }
    });
  }




}
