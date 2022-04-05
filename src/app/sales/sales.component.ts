import { Component, OnInit } from '@angular/core';
import { StoreItem } from "../models/store-item";
import { FormControl } from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {DialogService} from "../dialogs/dialog.service";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  cart: StoreItem[];
  totalPrice: number;

  barcodeText: FormControl;
  displayedColumns = ['count', 'itemName', 'price', 'barcode', 'delete'];
  cartTableData: MatTableDataSource<StoreItem>;

  constructor(public dialogService: DialogService) {
    this.cart = [];
    this.totalPrice = 0;
    this.barcodeText = new FormControl("");
    this.cartTableData = new MatTableDataSource<StoreItem>();

    // // test cart
    // this.cart = [new StoreItem('2', 'among us plushie', 2, 2), new StoreItem('2', 'firefox kinemon plushie', 5, 1)];

    this.updateCart();
  }

  // adds an item to the cart
  addItem(item: StoreItem): void {
    this.totalPrice += item.price;
    this.cart.push(item);
    this.updateCart();
  }

  // deletes an item from the cart
  deleteItem(index: number): void {
    this.totalPrice -= this.cart[index].price;
    this.cart.splice(index, 1);
    this.updateCart();
  }

  // finalizes a transaction, removes stock, and clears all fields
  confirmTransaction(): void {
    const options = {title:"Confirm Transaction",
                     message:"Are you sure you wish to confirm this transaction?",
                     confirmText: "Confirm",
                     cancelText: "Return"}
    this.dialogService.openConfirmCancel(options).then(ans => {
      if(ans){
        //make calls to inventory service here
        this.cart = [];
        this.updateCart();
      }//else just let the dialog close and nothing changes
    })
  }

  //refreshes cart and total cost based on items in cart
  updateCart(): void {
    this.cartTableData.data = this.cart;
  }

  ngOnInit(): void {
  }

}
