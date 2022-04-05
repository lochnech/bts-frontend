import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef} from "@angular/material/dialog";
import { ConfirmDialogComponent } from './confirm-dialog.component';
import {Observable, of} from "rxjs";

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
}
