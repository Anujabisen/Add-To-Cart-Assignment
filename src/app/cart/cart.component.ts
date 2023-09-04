import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cartItems: any[] = [];
  subtotal: number = 0;
  vatTax: number = 0;
  discount: number = 0;
  total: number = 0;
  data :any
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    //this.cartItems = this.cartService.getCartItems();
    console.log(this.cartItems)
   
    this.cartService.getDataSubject().subscribe((data:any)=>{
     console.log(data);
     const existingProduct = this.cartItems.find((items) => items.id === data.id);
  
     if (existingProduct) {
      this.updateItem(data)
       // If the product is already in the cart, display a message
       alert(`Product "${data.title}" is already in the cart.`);
    
     } else {
       // If the product is not in the cart, add it with a quantity of 1
       this.cartItems.push({ ...data, quantity: 1 });
      this.updateItem(data)

     }

    })
    this.calculateCartSummary();

  }

  calculateCartSummary(): void {

    this.subtotal = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    // Implement VAT tax, discount, and total calculations as needed
  }
  updateItem(item: any): void {
    console.log(item);
    
    // Implement the logic to update the item's total when the quantity changes
 

    item.total = item.price * item.quantity;
    this.discount =this.discount + item.discountPercentage;
   
    this.calculateCartSummary(); // Recalculate the cart summary after updating
    this.total = this.subtotal - (this.subtotal *  this.discount/100 )
  }
 
  
}
