export class StoreItem {
  barcode: string;
  name: string;
  price: number;
  stock: number;

  constructor(barcode: string, name: string, price: number, stock: number) {
    this.barcode = barcode;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }
}
