import { ChangeDetectionStrategy, Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogService } from "../dialog.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})

export class ConfirmDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelText: string,
    confirmText: string,
    message: string,
    title: string,
    total: string
  }, private mdDialogRef: MatDialogRef<ConfirmDialogComponent>, private dialogService: DialogService) { }

  public close(value:boolean) {
    this.mdDialogRef.close(value);
  }

  public cancel() {
    this.close(false);
  }

  public confirm() {
    this.close(true);
  }

  public makeChange() {
    let options = {totalPrice: this.data.total}
    this.dialogService.openMakeChange(options)
  }

  @HostListener("keydown.esc")
  public onEsc() {
    this.close(false);
  }
}
