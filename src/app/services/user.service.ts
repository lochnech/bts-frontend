import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
// import data from '../../../googleauthinfo.json';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  status: BehaviorSubject<boolean>;

  constructor(private route: Router, private http: HttpClient) {
    this.status = new BehaviorSubject<boolean>(false)
  }

  public signIn(username: string, password: string): Promise<boolean> {
    // gapi.auth2.getAuthInstance().signIn({scope: 'https://www.googleapis.com/auth/userinfo.profile'})
    //   .then(user => {
    //     if (user.getBasicProfile().getEmail().includes('@psdr3.org')) {
    //       this.status.next(true);
    //     }
    //   })
    return new Promise<boolean>((res, rej) => {
      // this.http.post<boolean>(environment.signInURL, {username: username, password: password}, {observe: 'response'})
      //   .subscribe((response) => {
      //     if (response.status == 200) {
      //       this.status.next(true);
      //       res(true);
      //     } else if (response.status == 401) {
      //       this.status.next(false);
      //       res(false);
      //     } else {
      //       this.status.next(false);
      //       rej();
      //     }
      //   });
      this.status.next(true);
      res(true);
    });
  }

  public signOut(): void {
    // if (gapi.auth2 !== undefined) {
    //   gapi.auth2.getAuthInstance().signOut();
    // }
    this.route.navigate(['/welcome']).then(() => location.reload())
  }

  // public getBearerToken(): string {
  //   return gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
  // }

}
