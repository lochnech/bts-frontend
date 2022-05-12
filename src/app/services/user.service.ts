import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
// import data from '../../../googleauthinfo.json';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  status: BehaviorSubject<boolean>;
  userToken: BehaviorSubject<string>;

  constructor(private route: Router, private http: HttpClient) {
    this.status = new BehaviorSubject<boolean>(false);
    this.userToken = new BehaviorSubject<string>("");
  }

  public signIn(username: string, password: string): Promise<boolean> {
    // gapi.auth2.getAuthInstance().signIn({scope: 'https://www.googleapis.com/auth/userinfo.profile'})
    //   .then(user => {
    //     if (user.getBasicProfile().getEmail().includes('@psdr3.org')) {
    //       this.status.next(true);
    //     }
    //   })
    return new Promise<boolean>((res, rej) => {
      this.http.post<string>(`${environment.authURL}/verify`, {username: username, password: password}, {observe: 'response'})
        .subscribe((response) => {
          if (response.status == 200) {
            this.status.next(true);
            this.userToken.next(response.body || "")
            res(true);
          } else if (response.status == 401) {
            this.status.next(false);
            res(false);
          } else {
            this.status.next(false);
            rej();
          }
        });

      //Fast pass
      // this.status.next(true);
      // res(true);
    });
  }

  public signOut(): void {
    // if (gapi.auth2 !== undefined) {
    //   gapi.auth2.getAuthInstance().signOut();
    // }
    this.route.navigate(['/welcome']).then(() => {
      this.status.next(false);
      location.reload();
    });
  }

  // public getBearerToken(): string {
  //   return gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
  // }

}
