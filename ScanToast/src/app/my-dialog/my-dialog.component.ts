import { Component,Inject,inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Bill } from '../interfaces/bill';
import { AdminService } from '../services/admin.service';
import { HotToastService } from '@ngneat/hot-toast';

declare let Razorpay:any;
@Component({
    selector: 'app-my-dialog',
    standalone: true,
    templateUrl: './my-dialog.component.html',
    styleUrl: './my-dialog.component.css',
    imports: [MatDialogModule, ReactiveFormsModule, CommonModule, 
      FormsModule,MatFormFieldModule,MatInputModule]
})
export class MyDialogComponent {
  public adminService=inject(AdminService);
  public toaster=inject(HotToastService);
  options:any;
  contactForm!: FormGroup;
  constructor(public dialogRef: MatDialogRef<MyDialogComponent>, private FormBuilder:FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit(): void {
    this.contactForm = this.FormBuilder.group({
      name: ['',Validators.required],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]]
    });
   
  }

  loadRazorpay(name:string,phone:number,amount:number): void {
    this.options = {
      "key": "rzp_test_AsrY6ng3mSO9Ne", // Enter the Key ID generated from the Dashboard
      "amount":amount*100,
      "currency": "INR",
      "description": "Acme Corp",
      "image": "",
      "prefill":
      {
        "name": name,
        "contact": phone,
      },
      config: {
        display: {
          blocks: {
            banks: {
              name: 'All payment methods',
              instruments: [
                {
                  method: 'upi'
                },
                {
                  method: 'card'
                },
                {
                    method: 'wallet'
                },
                {
                    method: 'netbanking'
                }
              ],
            },
          },
          sequence: ['block.banks'],
          preferences: {
            show_default_blocks: true,
          },
        },
      },
      "handler": (response: any) => {
        console.log("payment done with id : ", response.razorpay_payment_id)
        let info: Bill = {
            pay_id: response.razorpay_payment_id,
            name: name,
            phone: phone,
            amount: amount,
        }
        this.adminService.storeBill(info).pipe(this.toaster.observe({
          success:"Payment Success"
        })).subscribe();
    },
      "modal": {
        "ondismiss": function () {
          if (confirm("Are you sure, you want to close the form?")) {
            let txt = "You pressed OK!";
          } else {
            let txt = "You pressed Cancel!";
          }
        }
      }
    };

  }

    paymentHandler(response:any): void {
   
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature);
    }

  onSubmit() {
    // Handle form submission here
    if(this.contactForm.valid)
      {
        let name= this.contactForm.value.name;
        let phone=this.contactForm.value.phone;
       this.loadRazorpay(name,phone,this.data.totalres);
          Razorpay.open(this.options);  
      }
      else
      alert("Invalid name or phone number..");
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  pay() {
  
//     Razorpay.on('payment.failed', function (response:any){
//       alert(response.error.code);
//       alert(response.error.description);
//       alert(response.error.source);
//       alert(response.error.step);
//       alert(response.error.reason);
//       alert(response.error.metadata.order_id);
//       alert(response.error.metadata.payment_id);
// });
    }
}
