import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  status: BehaviorSubject<boolean>;
  userToken: BehaviorSubject<string>;
  is_admin: BehaviorSubject<boolean>;
  private userURL = environment.userURL;

  constructor(private route: Router, private http: HttpClient) {
    this.status = new BehaviorSubject<boolean>(false);
    this.userToken = new BehaviorSubject<string>("");
    this.is_admin = new BehaviorSubject<boolean>(false);
  }

  public signIn(username: string, password: string): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
      this.http.post<string>(`${environment.authURL}/verify`, {username: username, password: password}, {observe: 'response'})
        .subscribe((response) => {
          if (response.status == 200) {
            this.status.next(true);
            this.userToken.next(response.body || "");
            this.isAdmin(username).then(ans => res(true))
          } else if (response.status == 401) {
            this.status.next(false);
            res(false);
          } else {
            this.status.next(false);
            rej();
          }
        });
    });
  }

  public isAdmin(username: String): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
      this.http.get<boolean>(`${environment.userURL}/${username}/is_admin`, {observe: 'response'})
        .subscribe((response) => {
          if (response.status == 200) {
            this.is_admin.next(response.body || false);
            res(true);
          } else {
            this.status.next(false);
            rej();
          }
        });
    })
  }

  public signOut(): void {
    this.route.navigate(['/welcome']).then(() => {
      this.status.next(false);
      location.reload();
    });
  }

  /** GET all users. Will return a User[] observable */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userURL).pipe(
      catchError(this.handleError<User[]>('getUsers', [])));
  }

  /** POST user with all data. Will add user to the users table **/
  addUser(user: User, password: String): Observable<HttpResponse<User>>{
    return this.http.post<User>(this.userURL, {user, password}, {observe :'response'});
  }

  /** PUT user with all data. Will update user in the users table **/
  changeUser(username: string, user: User, password: String): Observable<User | null>{
    const url = `${this.userURL}/${username}`;
    return this.http.put<User>(url, {user, password}, {observe :'response'}).pipe(map(response => {
      return response.body;
    }))
  }

  /** DELETE user with all data. Will delete user from the users table **/
  deleteUser(username: string): Observable<User | null>{
    const url = `${this.userURL}/${username}`;
    return this.http.delete<User>(url, {observe :'response'}).pipe(map(response => {
      return response.body;
    }))
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
