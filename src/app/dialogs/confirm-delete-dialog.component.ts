import { ChangeDetectionStrategy, Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { StoreItem } from "../models/store-item";
import { User } from "../models/user";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
})

export class ConfirmDeleteDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: StoreItem | User, private mdDialogRef: MatDialogRef<ConfirmDeleteDialogComponent>) { }

  public cancel() {
    this.close(false);
  }

  public close(value:boolean) {
    this.mdDialogRef.close(value);
  }

  public confirm() {
    this.close(true);
  }

  @HostListener("keydown.esc")
  public onEsc() {
    this.close(false);
  }
}
