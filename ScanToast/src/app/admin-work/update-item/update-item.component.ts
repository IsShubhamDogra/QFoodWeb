import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemListService } from '../../services/item-list.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-update-item',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './update-item.component.html',
  styleUrl: './update-item.component.css'
})
export class UpdateItemComponent implements OnInit{
  itemId: any;
  itemForm: FormGroup;

  constructor(private http: HttpClient, private route: ActivatedRoute, private formBuilder: FormBuilder,
    private itemListService: ItemListService,private toastr:ToastrService,private toast:HotToastService) {
    this.itemForm = this.formBuilder.group({
      itemName: ['', Validators.required],
      price: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
     this.itemId = params['id'];
      this.loadItemData();
    });
  }

  loadItemData() {
    if (!this.itemId) {
      console.error('Item ID is undefined.');
      return;
    }
    else
    {
      this.itemListService.getItemById(this.itemId).subscribe((response)=>{
          this.itemForm.patchValue({
          itemName: response.itemName,
          price: response.price
      })
     })
    }
  }

  updateItem() {
    if (this.itemForm.valid) {
      const formData = this.itemForm.value;
      this.itemListService.updateItem(this.itemId,formData).subscribe();
      this.toast.success("Update successfull")
    } else {
      this.toast.error("Update Failed")
      console.error('Form is invalid.');
    }
  }
}
