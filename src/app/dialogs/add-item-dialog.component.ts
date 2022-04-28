import { Component, HostListener } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import {SnackbarService} from "../services/snackbar.service";
import {StoreItem} from "../models/store-item";
import {InventoryService} from "../services/inventory.service";

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html'
})
export class AddItemDialogComponent{

  barcode: string;
  name: string;
  price: number;
  stock: number;

  constructor(private mdDialogRef: MatDialogRef<AddItemDialogComponent>, private snackbar: SnackbarService, private inventoryService: InventoryService) {
    this.barcode = '';
    this.name = '';
    this.price = 0;
    this.stock = 0;
  }

  public cancel() {
    this.close(false);
  }

  public close(value: boolean) {
    this.mdDialogRef.close(value);
  }

  public confirm() {
    if (this.barcode.match(/\d+/) && this.name != '' && this.price != 0) {
      this.name=this.name[0].toUpperCase()+this.name.substring(1);
      this.inventoryService.addItem(new StoreItem(this.barcode, this.name, this.price * 100, this.stock)).subscribe((response) => {
        this.close(true)
      }, (error) => {
        this.snackbar.open('Something Went Wrong! Please Verify that this item does not already exist in the inventory', 'Dismiss', 10000);
      })
    } else {
      this.snackbar.open('Invalid Info', 'Dismiss', 5000);
    }
  }

  @HostListener("keydown.esc")
  public onEsc() {
    this.close(false);
  }
}
