import {Component, HostListener, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../../services/snackbar.service";
import {StoreItem} from "../../models/store-item";

@Component({
  selector: 'app-edit-item-dialog',
  templateUrl: './edit-item-dialog.component.html'
})
export class EditItemDialogComponent{

  barcode: string;
  name: string;
  price: number;
  stock: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: StoreItem, private mdDialogRef: MatDialogRef<EditItemDialogComponent>, private snackbar: SnackbarService) {
    this.barcode = this.data.barcode;
    this.name = this.data.name;
    this.price = this.data.price/100;
    this.stock = this.data.stock;
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
