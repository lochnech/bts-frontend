import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-make-change-dialog',
  templateUrl: './make-change-' +
    'dialog.component.html',
})

export class MakeChangeDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    totalPrice: string;
  }, private mdDialogRef: MatDialogRef<MakeChangeDialogComponent>) { }

  public close(value: true) {
    this.mdDialogRef.close(value);
  }

}
