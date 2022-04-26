import { Component, HostListener } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import {SnackbarService} from "../services/snackbar.service";
import {StoreItem} from "../models/store-item";

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html'
})
export class AddItemDialogComponent{

  barcode: string;
  name: string;
  price: number;
  stock: number;

  constructor(private mdDialogRef: MatDialogRef<AddItemDialogComponent>, private snackbar: SnackbarService) {
    this.barcode = '';
    this.name = '';
    this.price = 0;
    this.stock = 0;
  }

  public cancel() {
    this.close(false);
  }

  public close(value: any) {
    this.mdDialogRef.close(value);
  }

  public confirm() {
    if (this.barcode.length == 12 && this.name != '' && this.price != 0) {
      this.close(new StoreItem(this.barcode, this.name, this.price * 100, this.stock));
    } else {
      this.snackbar.open('Invalid Info', 'Dismiss', 5000);
    }
  }

  @HostListener("keydown.esc")
  public onEsc() {
    this.close(false);
  }
}
