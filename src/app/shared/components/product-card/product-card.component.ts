import { Component, Input, input } from '@angular/core';
import { Product } from '../../../core/modals/api.interface';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input()
  product : Product ={} as Product;
}
