import { Component, OnInit } from '@angular/core';
import { CategortService } from '../../core/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../core/modals/data.interface';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  term : string = '';

  isLoading=false;
  categories : Category[] =[];
  constructor(private CategortService: CategortService , private toaster : ToastrService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }
 

  getAllCategories() {
    this.isLoading=true;
    this.CategortService.getAllCateogries({}).subscribe({
      next: (res) => {
        this.categories = res.data
      }
    });
  }




}
