import {TransactionItem} from "./transaction-item";

export class Transaction {
  id: number;
  price: number;
  item_count: number;
  time_code: Date;
  items: TransactionItem[];


  constructor(id: number, price: number, item_count: number, time_code: Date, items: TransactionItem[]) {
    this.id = id;
    this.price = price;
    this.item_count = item_count;
    this.time_code = time_code;
    this.items = items;
  }
}
