import { Component, OnInit } from '@angular/core';
import {StoreItem} from "../models/store-item";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  itemList: StoreItem[] = [];
  totalCost: number = 0.00;
  columnsToDisplay = [];

  constructor() {}

  addItem(item: StoreItem): void {
    this.itemList.push(item);
  }

  ngOnInit(): void {
  }

}
