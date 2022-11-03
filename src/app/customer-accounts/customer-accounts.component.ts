import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {
  // customer!:Customer;
  customerId! : number;
  customerName! : string;
  customerAccounts! : any;
  constructor(private activateRoute: ActivatedRoute, private router:Router, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerId=this.activateRoute.snapshot.params['id'];
    // this.customer=this.router.getCurrentNavigation()?.extras.state as Customer;
    this.customerName = this.activateRoute.snapshot.params['name'];;
    this.hadleCustomerAccounts(this.customerId);
  }

  hadleCustomerAccounts(id:number){
    this.customerService.getCustomerAccounts(this.customerId).subscribe({
      next:data =>{
        this.customerAccounts=data;
      }, error:err =>{
        console.log(err);
      }
    })
  }

}
