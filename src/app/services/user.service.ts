import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import data from '../../../googleauthinfo.json';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  status: BehaviorSubject<boolean>;

  constructor(private route: Router) {
    this.status = new BehaviorSubject<boolean>(false)
  }

  loadGapi() {
    gapi.load('auth2', () => gapi.auth2.init({client_id: data.web.client_id}));
  }

  public signIn() {
    gapi.auth2.getAuthInstance().signIn({scope: 'https://www.googleapis.com/auth/userinfo.profile'})
      .then(user => {
        if (user.getBasicProfile().getEmail().includes('@psdr3.org')) {
          this.status.next(true);
        }
      })
  }

  public signOut(): void {
    if (gapi.auth2 !== undefined) {
      gapi.auth2.getAuthInstance().signOut();
    }
    this.route.navigate(['/welcome']).then(() => location.reload())
  }

  public getBearerToken(): string {
    return gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token;
  }

}
