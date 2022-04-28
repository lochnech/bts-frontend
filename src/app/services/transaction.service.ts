import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Transaction } from "../models/transaction";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactionURL = environment.transactionURL;

  constructor(private http: HttpClient) { }

  /** GET full transaction history. Will return a Transaction[] observable */
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.transactionURL).pipe(
      catchError(this.handleError<Transaction[]>('getTransactions', [])));
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


