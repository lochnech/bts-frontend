export class User {
  username: string;
  is_admin: boolean;

  constructor(username: string, is_admin: boolean , ) {
    this.username = username;
    this.is_admin = is_admin;
  }
}
