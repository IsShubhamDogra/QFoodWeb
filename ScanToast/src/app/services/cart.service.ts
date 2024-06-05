import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: any[] = [];

   addToCart = (item:any) => {
    const isItemInCart = this.cartItems.find((cartItem) => cartItem.item_ID === item._id); // check if the item is already in the cart
    if (isItemInCart) {
      this.cartItems = this.cartItems.map((cartItem) => {
        if (cartItem.item_ID === item._id) {
          cartItem.quantity = cartItem.quantity + 1
          return cartItem;
        } else {
          return cartItem;
        }
      });
    }
     else {
      this.cartItems.push({
            itemName: item.itemName,
            itemPrice:item.price,
            item_ID:item._id,
            quantity:1 
           }); // if the item is not in the cart, add the item to the cart
    }
  };

  getCartItems(): any[] {
    return this.cartItems;
  }
  updateCartItem(cartItems:any[]){
    this.cartItems=cartItems;
  }
}
