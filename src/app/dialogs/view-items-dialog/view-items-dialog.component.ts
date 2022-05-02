import { Component, HostListener, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TransactionItem } from "../../models/transaction-item";
import { Transaction } from "../../models/transaction";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-view-items-dialog',
  templateUrl: './view-items-dialog.component.html'
})

export class ViewItemsDialogComponent {

  items: TransactionItem[];
  displayedColumns = ['barcode'];
  transactionItemData: MatTableDataSource<TransactionItem>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    transaction: Transaction;
  }, private mdDialogRef: MatDialogRef<ViewItemsDialogComponent>) {
    this.items = data.transaction.items;
    this.transactionItemData = new MatTableDataSource<TransactionItem>();
  }

  public close() {
    this.mdDialogRef.close();
  }

  @HostListener("keydown.esc")
  public onEsc() {
    this.close();
  }
}
