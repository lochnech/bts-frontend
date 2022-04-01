import { Component, OnInit } from '@angular/core';
import { StoreItem } from "../models/store-item";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  cart: StoreItem[] = [];
  totalCost: number = 0.00;

  barcodeText: FormControl;

  constructor() {
    this.barcodeText = new FormControl();
  }

  // adds an item to the cart
  addItem(item: StoreItem): void {
    this.cart.push(item);
  }

  // deletes an item from the cart
  deleteItem(index: number): void {
    this.cart.splice(index, 1);
  }

  ngOnInit(): void {
  }

}
