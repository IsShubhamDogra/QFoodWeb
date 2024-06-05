import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { MatDialog } from '@angular/material/dialog' ;
import { MyDialogComponent } from '../my-dialog/my-dialog.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
 
  constructor(private cartService:CartService,private dialog: MatDialog,private route:Router){}
  cartItems:any[]=[];
  value:number=0;
  Totalres:number=0;
  ngOnInit(): void {

  }
  a() {
    this.cartItems=this.cartService.getCartItems();
    return this.cartItems;
  }

  getValue(){
    this.value=0;
    this.cartItems.map((elem)=>{
      this.value=this.value+elem.quantity
    })
    return this.value;
  }

  getTotalPrice(): number { 
    let res=this.cartItems.reduce((total, item) => total + item.itemPrice * item.quantity, 0);
    this.Totalres=res;
    return res;
  }

  deleteItem(item:any) {
    this.cartItems = this.cartItems.filter(i => i.item_ID!==item.item_ID);
    this.cartService.updateCartItem(this.cartItems);
    this.getValue();
    this.getTotalPrice();
  
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      width: '500px',
      data: {totalres:this.Totalres}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
