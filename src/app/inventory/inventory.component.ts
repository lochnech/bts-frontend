
import { Component, OnInit } from '@angular/core';
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
export class InventoryComponent implements OnInit {
  data: StoreItem [];
  totalPrice: number;
  barcodeForm: FormGroup;


  displayedColumns = ['barcode','name','price','stock','edit'];
  dataSource: MatTableDataSource<StoreItem>;

  constructor( public formBuilder: FormBuilder, public inventoryService: InventoryService,public dialogService: DialogService, public snackbar: SnackbarService  ) {
    this.data = [];
    this.totalPrice = 0;
    this.dataSource = new MatTableDataSource<StoreItem>()

    this.inventoryService.getInventory().subscribe(answers => {
      this.dataSource.data = answers;
    });
    this.barcodeForm = new FormGroup({
      barcodeText: new FormControl('', [
        Validators.required,
        Validators.pattern("[0-9]+")
      ])
    });

    this.updateData()


  }

  updateData(): void {
    this.dataSource.data = this.data;
  }

  addItem() {
    this.dialogService.openAddItem().then(ans => {
      this.inventoryService.addItem(ans).subscribe()
      this.updateData();
    });

  }

  editItem(item: StoreItem) {
    console.log('editing item: ' + item);
  }

  ngOnInit(): void {
  }

}
