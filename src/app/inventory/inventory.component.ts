import {Component, OnInit, ViewChild} from '@angular/core';
import { InventoryService } from "../services/inventory.service";
import { MatTableDataSource } from "@angular/material/table";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DialogService } from "../dialogs/dialog.service";
import { SnackbarService } from "../services/snackbar.service";
import {MatSort} from "@angular/material/sort";

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

export class InventoryComponent implements OnInit{
  data: StoreItem [];
  totalPrice: number;
  barcodeForm: FormGroup;
  filterValue: any;

  displayedColumns = ['barcode','name','price','stock','edit','delete'];
  inventoryData: MatTableDataSource<StoreItem>;

  @ViewChild('table1', { read: MatSort, static: true }) sort1: MatSort = new MatSort();

  ngOnInit() {
    this.inventoryData.filterPredicate = (data: StoreItem, filter: string) => {
      return data.barcode.includes(filter);
    };
  }

  ngAfterViewInit() {
    this.inventoryData.sort = this.sort1;
  }

  applyFilter(filterValue: any) {
    this.inventoryData.filter = this.filterValue.trim().toLowerCase();
  }

  constructor(public inventoryService: InventoryService,public dialogService: DialogService, public snackbar: SnackbarService) {
    this.data = [];
    this.totalPrice = 0;
    this.inventoryData = new MatTableDataSource<StoreItem>()

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
      this.inventoryData.data = answers;
      this.data = answers
    });
  }

  addItem() {
    this.dialogService.openAddItem().then(ans => {
      this.updateData();
    }).catch(ans => this.snackbar.open("Item Not Added", 'Dismiss', 5000));
  }

  editItem(item: StoreItem) {
    this.dialogService.openEditItem(item).then(ans => {
      this.inventoryService.changeItem(item.barcode, ans).subscribe(ans => this.updateData());
    }).catch(ans => this.snackbar.open("Something Went Wrong Editing Item", 'Dismiss', 5000));
  }

  deleteItem(item: StoreItem) {
    this.dialogService.openConfirmDelete(item).then(ans => {
      if(ans){
        this.inventoryService.deleteItem(item.barcode).subscribe(ans => this.updateData());
      }
    }).catch(ans => this.snackbar.open("Something Went Wrong Deleting Item", 'Dismiss', 5000));
  }

}
