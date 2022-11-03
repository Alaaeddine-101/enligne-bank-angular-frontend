import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers! : Observable<Array<Customer>>;
  errorMsg : string | undefined;
  searchFormGroup! : FormGroup;
  constructor(private customerService:CustomerService, private formBuilder:FormBuilder, private router:Router) { }

  ngOnInit(): void {
  this.searchFormGroup = this.formBuilder.group({
    keyword : this.formBuilder.control("")
  })
  // this.customers =  this.customerService.getCustomers().pipe(
  //   catchError(err =>{
  //     this.errorMsg = err.message;
  //     throw throwError(err);
  //   })
  // )
  this.handleSearchCustomers();
  // .subscribe ({
  //     next : (data) =>{
  //       this.customers = data
  //     },
  //     error : (err) => {
  //      this.errorMsg = err.message
  //     }
  //   })
  }
  handleSearchCustomers(){
    let kw = this.searchFormGroup?.value.keyword;
    this.customers = this.customerService.searchCustomers(kw).pipe(
      catchError(err =>{
        this.errorMsg = err.message;
        throw throwError(err);
      })
    )
  }
  handleDeleteCustomer(c:Customer) {
    let conf = confirm("Are you sure?");
    if(!conf) return ;
      this.customerService.deleteCustomer(c.id).subscribe({
        next:data =>{
          this.customers=this.customers.pipe(
            map(data=>{
              let index = data.indexOf(c);
              data.slice(index, 1);
                return data;
            })
          );
        }, error:err =>{
          console.log(err);
        }
      })
    }
    handleCustomerAccount(c:Customer){
      this.router.navigateByUrl("/customer-accounts/"+c.id+"/"+c.name);
    }
}
