import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AddItemDialogComponent } from "./add-item-dialog/add-item-dialog.component";
import { EditItemDialogComponent } from "./edit-item-dialog/edit-item-dialog.component";
import { ConfirmDeleteDialogComponent } from "./confirm-delete-dialog/confirm-delete-dialog.component";
import { MakeChangeDialogComponent } from "./make-change-dialog/make-change-dialog.component";
import { ViewItemsDialogComponent } from "./view-items-dialog/view-items-dialog.component";
import { StoreItem } from "../models/store-item";
import { Transaction } from "../models/transaction";

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) { }

  dialogRef: MatDialogRef<any> | undefined;

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
        res(ans);
      });
    })
  }

  public openMakeChange(options: {totalPrice: string}) : Promise<void> {
    return new Promise<void>((res) => {
      this.dialogRef = this.dialog.open(MakeChangeDialogComponent, {data: {totalPrice: options.totalPrice}});
      this.dialogRef.afterClosed().subscribe(ans => {
        res(ans);
      })
    });
  }

  public openViewItems(transaction: Transaction): Promise<void> {
    return new Promise<void>((res) => {
      this.dialogRef = this.dialog.open(ViewItemsDialogComponent);
      this.dialogRef.afterClosed().subscribe(ans => res(ans));
    });
  }

}
