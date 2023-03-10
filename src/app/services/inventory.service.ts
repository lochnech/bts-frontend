import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { StoreItem } from "../models/store-item";
import { catchError, map } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class InventoryService {

  private inventoryURL = environment.inventoryURL;

  constructor(private http: HttpClient) { }

  /** GET all items in inventory. Will return a StoreItem[] observable */
  getInventory(): Observable<StoreItem[]> {
    return this.http.get<StoreItem[]>(this.inventoryURL).pipe(
      catchError(this.handleError<StoreItem[]>('getInventory', [])));
  }

  /** GET item by barcode. Will 404 if item not found */
  getItemByBarcode(barcode: string): Observable<StoreItem> {
    const url = `${this.inventoryURL}/barcode/${barcode}`;
    return this.http.get<StoreItem>(url).pipe(
      catchError(this.handleError<StoreItem>(`getItemByBarcode barcode=${barcode}`))
    );
  }

  /** POST item with all data. Will add item to the inventory table **/
  addItem(item: StoreItem): Observable<HttpResponse<StoreItem>>{
    return this.http.post<StoreItem>(this.inventoryURL, item, {observe :'response'});
  }

  /** PUT item with all data. Will add item to the inventory table **/
  changeItem(barcode: string, item: StoreItem): Observable<StoreItem | null>{
    const url = `${this.inventoryURL}/barcode/${barcode}`;
    return this.http.put<StoreItem>(url, item, {observe :'response'}).pipe(map(response => {
      return response.body;
    }));
  }

  /** DELETE item with all data. Will delete item from the inventory table **/
  deleteItem(barcode: string): Observable<StoreItem | null>{
    const url = `${this.inventoryURL}/barcode/${barcode}`;
    return this.http.delete<StoreItem>(url, {observe :'response'}).pipe(map(response => {
      return response.body;
    }));
  }

  /** POST a sale of a StoreItem[]. Will remove these items in these quantities from the inventory table */
  makeSale(items: StoreItem[]): Observable<StoreItem[] | null>{
    const barcodes = items.map(item => item.barcode);
    const url = `${this.inventoryURL}/sale`;
    return this.http.post<StoreItem[]>(url, {"barcodes": barcodes}, {observe :'response'}).pipe(map(response => {
      return response.body;
    }));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

