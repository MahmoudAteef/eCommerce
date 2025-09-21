import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',canActivate:[authGuard],
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'products',canActivate:[authGuard],
    loadComponent: () =>
      import('./features/products/products.component').then(
        (m) => m.ProductComponent
      ),
  },
    {
    path: 'product-detalis/:id/:title',canActivate:[authGuard],
    loadComponent: () =>
      import('./features/product-detalis/product-detalis.component').then((m) => m.ProductDetalisComponent),
  },
  {
    path: 'cart',canActivate:[authGuard],
    loadComponent: () =>
      import('./features/cart/cart.component').then((m) => m.CartComponent),
  },
    {
    path: 'allorders',canActivate:[authGuard],
    loadComponent: () =>
      import('./features/all-orders/all-orders.component').then((m) => m.AllOrdersComponent),
  },
  {
    path: 'categories',canActivate:[authGuard],
    loadComponent: () =>
      import('./features/categories/categories.component').then(
        (m) => m.CategoriesComponent
      ),
  },
  {
    path: 'brands',canActivate:[authGuard],
    loadComponent: () =>
      import('./features/brands/brands.component').then(
        (m) => m.BrandsComponent
      ),
  },
    {
    path: 'wishlist',canActivate:[authGuard],
    loadComponent: () =>
      import('./features/wishlist/wishlist.component').then(
        (m) => m.WishlistComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./features/reset-password/reset-password.component').then(
        (m) => m.ResetPasswordComponent
      ),
  },
    {
    path: 'register',
    loadComponent: () =>
      import('./features/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/notfound/notfound.component').then(
        (m) => m.NotfoundComponent
      ),
  },
];
