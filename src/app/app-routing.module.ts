import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts/accounts.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';

const routes:Routes = [
  {path:"customers", component : CustomersComponent},
  {path:"accounts", component : AccountsComponent},
  {path:"new-customer", component:NewCustomerComponent},
  {path:"customer-accounts/:id/:name", component:CustomerAccountsComponent}
  
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ], 
  exports: [RouterModule]  
})
export class AppRoutingModule { }
