import { Routes } from '@angular/router';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { AddAProductComponent } from './components/admin/add-a-product/add-a-product.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { ViewStockComponent } from './components/admin/view-stock/view-stock.component';
import { ViewTransactionsComponent } from './components/admin/view-transactions/view-transactions.component';
import { ProductShowcaseComponent } from './components/customer/product-showcase/product-showcase.component';
import { ViewCartComponent } from './components/customer/view-cart/view-cart.component';
import { ComputerGeneratedBillComponent } from './components/shared/computer-generated-bill/computer-generated-bill.component';
export const routes: Routes = [
  { path: 'sign-up', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin-home', component: AdminHomeComponent }, //done
  { path: 'view-stock', component: ViewStockComponent }, //done
  { path: 'add-a-product', component: AddAProductComponent },
  { path: 'view-transactions', component: ViewTransactionsComponent }, //done
  { path: 'view-store', component: ProductShowcaseComponent }, //done
  { path: 'view-cart', component: ViewCartComponent }, //done
  { path: 'bill', component: ComputerGeneratedBillComponent },
];
