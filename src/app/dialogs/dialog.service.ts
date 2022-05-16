import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ConfirmDialogComponent } from './transaction-dialogs/confirm-dialog.component';
import { AddItemDialogComponent } from "./item-dialogs/add-item-dialog.component";
import { EditItemDialogComponent } from "./item-dialogs/edit-item-dialog.component";
import { ConfirmDeleteDialogComponent } from "./confirm-delete-dialog.component";
import { MakeChangeDialogComponent } from "./transaction-dialogs/make-change-dialog.component";
import { AddUserDialogComponent } from "./user-dialogs/add-user-dialog.component";
import { EditUserDialogComponent } from "./user-dialogs/edit-user-dialog.component";
import { ViewItemsDialogComponent } from "./transaction-dialogs/view-items-dialog.component";
import { StoreItem } from "../models/store-item";
import { User } from "../models/user";


@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) { }

  dialogRef: MatDialogRef<any> | undefined;

  //confirm or cancel a transaction
  public openConfirmCancel(options: { title: any; message: any; cancelText: any; confirmText: any; total:string}): Promise<boolean> {
    return new Promise<boolean>((res) => {
      this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: options.title,
          message: options.message,
          cancelText: options.cancelText,
          confirmText: options.confirmText,
          total: options.total
        }
      });
      this.dialogRef.afterClosed().subscribe((ans: boolean) => res(ans));
    });
  }

  //makes change at the end of a transaction
  public openMakeChange(options: {totalPrice: string}) : Promise<void> {
    return new Promise<void>((res) => {
      this.dialogRef = this.dialog.open(MakeChangeDialogComponent, {data: {totalPrice: options.totalPrice}});
      this.dialogRef.afterClosed().subscribe(ans => {
        res(ans);
      })
    })
  }

  //adds an item to the inventory
  public openAddItem(): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
      this.dialogRef = this.dialog.open(AddItemDialogComponent);
      this.dialogRef.afterClosed().subscribe((ans: boolean) =>{
        if (!ans) {
          rej(false)
        } else {
          res(true)
        }
      });
    })
  }

  //edits item in the inventory
  public openEditItem(item: StoreItem): Promise<StoreItem> {
    return new Promise<StoreItem>((res, rej) => {
      this.dialogRef = this.dialog.open(EditItemDialogComponent, {data: item});
      this.dialogRef.afterClosed().subscribe((ans: any) =>{
        if (!ans) {
          rej()
        } else {
          res(ans)
        }
      });
    })
  }

  //confirms to delete either an item or a user
  public openConfirmDelete(item: StoreItem | User): Promise<Boolean> {
    return new Promise<boolean>((res) => {
      this.dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {data: item});
      this.dialogRef.afterClosed().subscribe( (ans: boolean) => {
        res(ans);
      });
    })
  }

  public openViewItems(options: {transactionID: number}): Promise<void> {
    return new Promise<void>((res) => {
      this.dialogRef = this.dialog.open(ViewItemsDialogComponent, {data: {transactionID: options.transactionID}});
      this.dialogRef.afterClosed().subscribe(ans => res(ans));
    });
  }

  //adds a user to the users table
  public openAddUser(): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
      this.dialogRef = this.dialog.open(AddUserDialogComponent);
      this.dialogRef.afterClosed().subscribe((ans: boolean) =>{
        if (!ans) {
          rej(false)
        } else {
          res(true)
        }
      });
    })
  }

  //edits a user in the user table
  public openEditUser(user: User): Promise<[User, String] | [User]> {
    return new Promise<[User, String] | [User]>((res, rej) => {
      this.dialogRef = this.dialog.open(EditUserDialogComponent, {data: user});
      this.dialogRef.afterClosed().subscribe((ans: any) =>{
        if (!ans) {
          rej()
        } else {
          res(ans)
        }
      });
    })
  }
}
