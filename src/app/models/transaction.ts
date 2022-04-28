import { StoreItem } from "./store-item";

export class Transaction {
  id: number;
  price: number;
  item_count: number;
  time_code: Date;
  items: StoreItem[];


  constructor(id: number, price: number, item_count: number, time_code: Date, items: StoreItem[]) {
    this.id = id;
    this.price = price;
    this.item_count = item_count;
    this.time_code = time_code;
    this.items = items;
  }
}
