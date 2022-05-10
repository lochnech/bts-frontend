import {first} from "rxjs/operators";

export class User {

  constructor(public username?: string , public admin?: boolean , ) {

    this.username = username || " ";
    this.admin = admin || false;
  }
}
