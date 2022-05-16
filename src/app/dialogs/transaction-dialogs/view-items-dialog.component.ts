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

  displayedColumns = ['name', 'barcode', 'amount', 'ppu'];
  transactionID: number;
  transactionItemData: MatTableDataSource<TransactionItem>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {transactionID: number},
              private dialogRef: MatDialogRef<ViewItemsDialogComponent>,
              private transactionService: TransactionService) {
    this.transactionID = data.transactionID;
    this.transactionItemData = new MatTableDataSource<TransactionItem>();
    this.updateData();
  }

  updateData(): void {
    this.transactionService.getItemsByID(this.transactionID).subscribe(answers => {
      this.transactionItemData.data = answers;
    });
  }

  public close() {
    this.dialogRef.close();
  }

  @HostListener("keydown.esc")
  public onEsc() {
    this.close();
  }
}
