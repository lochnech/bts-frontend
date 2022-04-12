import { Component, OnInit } from '@angular/core';
import { StoreItem } from "../models/store-item";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { DialogService } from "../dialogs/dialog.service";
import { InventoryService } from "../services/inventory.service";
import { SnackbarService } from "../services/snackbar.service";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  cart: StoreItem[];
  totalPrice: number;
  cartTableData: MatTableDataSource<StoreItem>;
  barcodeForm: FormGroup;
  displayedColumns = ['count', 'itemName', 'price', 'barcode', 'delete'];

  constructor(public dialogService: DialogService, public formBuilder: FormBuilder, public inventoryService: InventoryService, public snackbar: SnackbarService) {
    this.cart = [];
    this.totalPrice = 0;
    this.cartTableData = new MatTableDataSource<StoreItem>();
    this.barcodeForm = new FormGroup({
      barcodeText: new FormControl('', [
        Validators.required,
        Validators.pattern("[0-9]+")
      ])
    });
    this.updateCart();
  }

  // adds an item to the cart
  addItem(barcode: string): void {
    if (!this.barcodeForm.invalid) {
      this.inventoryService.getItemByBarcode(barcode)
        .subscribe(item => {
          if (item) {
            this.totalPrice += item.price;
            this.cart.push(item);
            // @ts-ignore
            document.getElementById('barcodeTextBox').value = '';
            this.updateCart();
          } else {
            this.snackbar.open('Item not found in Inventory', 'Dismiss', 5000);
          }
        });
    } else {
      this.snackbar.open('Invalid Barcode', 'Dismiss', 5000);
    }
  }

  // deletes an item from the cart
  deleteItem(index: number): void {
    this.totalPrice -= this.cart[index].price;
    this.cart.splice(index, 1);
    this.updateCart();
  }

  // finalizes a transaction, removes stock, and clears all fields (now implements dialogs)
  confirmTransaction(): void {
    // options for the dialog
    const options = {title:"Confirm Transaction",
                     message:"Are you sure you wish to confirm this transaction?",
                     confirmText: "Confirm",
                     cancelText: "Cancel"};
    this.dialogService.openConfirmCancel(options).then(ans => {
      if (ans) {
        this.inventoryService.makeSale(this.cart).subscribe(response => {
          this.totalPrice = 0;
          this.cart = [];
          this.updateCart();
          this.snackbar.open('Sale Successfully Processed', 'Dismiss', 5000);
        });
      } else {
        this.snackbar.open('Sale Unsuccessful, Please Try Again', 'Dismiss', 10000);
      }
    });
  }

  // refreshes cart and total cost based on items in cart
  updateCart(): void {
    this.cartTableData.data = this.cart;
  }

  // executes when submitting the barcode
  onSubmit() {
    this.addItem(this.barcodeForm.value.barcodeText);
  }

  ngOnInit(): void {}

}
