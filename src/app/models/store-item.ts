export class StoreItem {
  barcode: string;
  itemName: string;
  price: number;
  quantity: number;

  constructor(barcode: string, itemName: string, price: number, quantity: number) {
    this.barcode = barcode;
    this.itemName = itemName;
    this.price = price;
    this.quantity = quantity;
  }
}
