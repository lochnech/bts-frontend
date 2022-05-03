import {Component, HostListener, Inject, Input} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TransactionItem } from "../../models/transaction-item";
import { Transaction } from "../../models/transaction";
import { MatTableDataSource } from "@angular/material/table";
import {TransactionService} from "../../services/transaction.service";

@Component({
  selector: 'app-view-items-dialog',
  templateUrl: './view-items-dialog.component.html'
})

export class ViewItemsDialogComponent {

  displayedColumns = ['barcode'];
  transactionItemData: MatTableDataSource<TransactionItem>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {transactionItems: TransactionItem[]}, private mdDialogRef: MatDialogRef<ViewItemsDialogComponent>) {

    this.transactionItemData = new MatTableDataSource<TransactionItem>(data.transactionItems);
  }

  public close() {
    this.mdDialogRef.close();
  }

  @HostListener("keydown.esc")
  public onEsc() {
    this.close();
  }
}
