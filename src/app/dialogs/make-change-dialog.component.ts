import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-make-change-dialog',
  templateUrl: './make-change-' +
    'dialog.component.html',
})

export class MakeChangeDialogComponent {
  changeDue: string = "";
  moneyGiven: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    totalPrice: string;
  }, private mdDialogRef: MatDialogRef<MakeChangeDialogComponent>) {
  }

  public close(value: true) {
    this.mdDialogRef.close(value);
  }

  public calculateChange(){
    console.log(this.data)
    console.log(this.data.totalPrice)
    this.changeDue = (parseFloat(this.data.totalPrice) - parseFloat(this.moneyGiven)).toString();
  }

}
