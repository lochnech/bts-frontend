import { Component, OnInit } from '@angular/core';
import { TransactionService } from "../services/transaction.service";
import { MatTableDataSource } from "@angular/material/table";
import { Transaction } from "../models/transaction";
import { DialogService } from "../dialogs/dialog.service";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  displayedColumns = ['id','price', 'itemCount', 'time', 'viewItems'];
  transactionsData: MatTableDataSource<Transaction>

  constructor(public transactionService: TransactionService, public dialogService: DialogService) {
    this.transactionsData = new MatTableDataSource<Transaction>();
    this.updateData();
  }

  viewItems(transaction: Transaction): void {
    let options = {transactionID: transaction.id};
    this.dialogService.openViewItems(options).then();
  }

  updateData(): void {
    this.transactionService.getTransactions().subscribe(answers => {
      this.transactionsData.data = answers;
    });
  }

  ngOnInit(): void {
  }

}
