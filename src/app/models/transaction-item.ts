export class TransactionItem {
  barcode: string;
  name: string;
  amount: number;
  ppu: number;
  total_price: number;

  constructor(barcode: string, name: string, amount: number, ppu: number, total_price: number) {
    this.barcode = barcode;
    this.name = name;
    this.amount = amount;
    this.ppu = ppu;
    this.total_price = total_price;
  }
}
