import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemListService } from '../../services/item-list.service';
import { Item } from '../../interfaces/item';
import { CommonModule } from '@angular/common';
import { Binary } from '@angular/compiler';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {
  selectedFile: File | null = null;

  formData = new FormGroup({
    itemName: new FormControl(''),
    price: new FormControl('')
  });
  data: any;
  constructor(private itemListService: ItemListService, private http: HttpClient, private toast: HotToastService) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target?.result;
      const formData = new FormData();
      if (this.selectedFile instanceof Blob) {
        formData.append('image', this.selectedFile);
      } else {
        console.error('Invalid file selected');
        return;
      }
      const itemName = this.formData.value?.itemName;
      const price = this.formData.value?.price;

      if (itemName) {
        formData.append('itemName', itemName);
      }

      if (price) {
        formData.append('price', price);
      }
      this.itemListService.postData(formData).subscribe();
      this.formData.reset();
      this.toast.success("Item Added");
    };
    reader.readAsDataURL(this.selectedFile);
  }
}
