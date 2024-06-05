import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router'
import { SubheadComponent } from '../subhead/subhead.component';
import { HeaderComponent } from '../header/header.component';
import { ItemListService } from '../services/item-list.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-end',
  standalone: true,
  imports: [SubheadComponent,HeaderComponent,RouterOutlet,CommonModule],
  templateUrl: './user-end.component.html',
  styleUrl: './user-end.component.css'
})
export class UserEndComponent {
  cartItems: any[]=[];
    addToCart(item: any): void {
      this.cartService.addToCart(item);
    }
  rows: any[] = [];
  data: any[]=[];
  constructor(private itemListService: ItemListService,private cartService:CartService){}
    ngOnInit(): void {
     this.loadData();
    }
    
  loadData() {
    this.itemListService.getData().subscribe(
      {
        next: (response: any) => {
          this.data=response;
        },
        error: (error: any) => {
          console.error('Error fetching data:', error);
        }
      });
  }
  getImageSrc(imageData:any): string {
    // debugger
    if (imageData && imageData.data && imageData.contentType) {
      const base64String = btoa(
        new Uint8Array(imageData.data.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      // tslint:disable-next-line:ban-source-unknown
      return `data:${imageData.contentType};base64,${base64String}`;
    }
    return ''; 
  }
  
}
