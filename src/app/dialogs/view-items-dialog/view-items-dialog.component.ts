import { Component, HostListener, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TransactionItem } from "../../models/transaction-item";
import {Transaction} from "../../models/transaction";


@Component({
  selector: 'app-view-items-dialog',
  templateUrl: './view-items-dialog.component.html'
})

export class ViewItemsDialogComponent {

  items: TransactionItem[];

  constructor(@Inject(MAT_DIALOG_DATA) private mdDialogRef: MatDialogRef<ViewItemsDialogComponent>, private data: Transaction) {
    this.items = data.items;
  }

  public close() {
    this.mdDialogRef.close();
  }

  @HostListener("keydown.esc")
  public onEsc() {
    this.close();
  }
}
