import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Transaction } from "../models/transaction";
import { catchError } from "rxjs/operators";
import {TransactionItem} from "../models/transaction-item";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactionURL = environment.transactionURL;

  constructor(private http: HttpClient) { }

  /** GET full transaction history with no items. Will return a Transaction[] observable */
  getTransactions(): Observable<Transaction[]> {
    const url = `${this.transactionURL}/summary`;
    return this.http.get<Transaction[]>(url).pipe(
      catchError(this.handleError<Transaction[]>('getTransactions', [])));
  }

  /** GET transaction items by taking a transaction. Will return a TransactionItem[] observable */
  getItemsByTransaction(transaction: Transaction): Observable<TransactionItem[]> {
    const url = `${this.transactionURL}/items/${transaction.id}`;
    return this.http.get<TransactionItem[]>(url).pipe(
      catchError(this.handleError<TransactionItem[]>('getItemsByTransaction', [])));
  }

  /** GET transaction items by taking a transaction ID. Will return a TransactionItem[] observable */
  getItemsByID(id: number): Observable<TransactionItem[]> {
    const url = `${this.transactionURL}/items/${id}`;
    return this.http.get<TransactionItem[]>(url).pipe(
      catchError(this.handleError<TransactionItem[]>('getItemsByTransaction', [])));
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


