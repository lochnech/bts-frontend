import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ConfirmDialogComponent } from './confirm-dialog.component';
import {MakeChangeDialogComponent} from "./make-change-dialog.component";

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
    })
  }
  public openMakeChange(options: {totalPrice: string}) : Promise<void> {
    return new Promise<void>((res) => {
      this.dialogRef = this.dialog.open(MakeChangeDialogComponent, {data: {totalPrice: options.totalPrice}});
      this.dialogRef.afterClosed().subscribe(ans => {
        res(ans);
      })
    })
  }
}
