export class StoreItem {
  name: string;
  barcode: string;
  price: number;
  stock: number;

  constructor(name: string, barcode: string, price: number, stock: number) {
    this.name = name;
    this.barcode = barcode;
    this.price = price;
    this.stock = stock;
  }
}
