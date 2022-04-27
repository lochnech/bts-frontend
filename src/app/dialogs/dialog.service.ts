import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ConfirmDialogComponent } from './confirm-dialog.component';
import {AddItemDialogComponent} from "./add-item-dialog.component";
import {EditItemDialogComponent} from "./edit-item-dialog.component";
import {StoreItem} from "../models/store-item";
import {ConfirmDeleteDialogComponent} from "./confirm-delete-dialog.component";

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) { }

  dialogRef: MatDialogRef<any> | undefined;

  public openConfirmCancel(options: { title: any; message: any; cancelText: any; confirmText: any; }): Promise<boolean> {
    return new Promise<boolean>((res) => {
      this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: options.title,
          message: options.message,
          cancelText: options.cancelText,
          confirmText: options.confirmText
        }
      });
      this.dialogRef.afterClosed().subscribe((ans: boolean) => res(ans));
    })
  }

  public openAddItem(): Promise<StoreItem> {
    return new Promise<StoreItem>((res, rej) => {
      this.dialogRef = this.dialog.open(AddItemDialogComponent);
      this.dialogRef.afterClosed().subscribe((ans: any) =>{
        if (!ans) {
          rej()
        } else {
          res(ans)
        }
      });
    })
  }

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

  public openConfirmDelete(item: StoreItem): Promise<Boolean> {
    return new Promise<boolean>((res) => {
      this.dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {data: item});
      this.dialogRef.afterClosed().subscribe( (ans: boolean) => {
        res(ans)
      });
    })
  }

}
