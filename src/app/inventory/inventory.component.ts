import { Component } from '@angular/core';
import {InventoryService} from "../services/inventory.service";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DialogService} from "../dialogs/dialog.service";
import {SnackbarService} from "../services/snackbar.service";

export interface StoreItem {
  barcode: string;
  name: string;
  price: number;
  stock: number;
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})

export class InventoryComponent {
  data: StoreItem [];
  totalPrice: number;
  barcodeForm: FormGroup;

  displayedColumns = ['barcode','name','price','stock','edit'];
  dataSource: MatTableDataSource<StoreItem>;

  constructor(public inventoryService: InventoryService,public dialogService: DialogService, public snackbar: SnackbarService) {
    this.data = [];
    this.totalPrice = 0;
    this.dataSource = new MatTableDataSource<StoreItem>()

    this.barcodeForm = new FormGroup({
      barcodeText: new FormControl('', [
        Validators.required,
        Validators.pattern("[0-9]+")
      ])
    });
    this.updateData()
  }

  updateData(): void {
    this.inventoryService.getInventory().subscribe(answers => {
      this.dataSource.data = answers;
      this.data = answers
    });
  }

  addItem() {
    this.dialogService.openAddItem().then(ans => {
      this.inventoryService.addItem(ans).subscribe(ans => this.updateData());
    }).catch(ans => this.snackbar.open("Something Went Wrong Adding Item", 'Dismiss', 5000));
  }

  editItem(item: StoreItem) {
    this.dialogService.openEditItem(item).then(ans => {
      this.inventoryService.changeItem(item.barcode, ans).subscribe(ans => this.updateData());
    }).catch(ans => this.snackbar.open("Something Went Wrong Editing Item", 'Dismiss', 5000));
  }

}
