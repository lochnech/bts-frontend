import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-make-change-dialog',
  templateUrl: './make-change-dialog.component.html',
})

export class MakeChangeDialogComponent {
  public changeDue: string = "";
  public moneyGiven: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    totalPrice: string;
  }, private mdDialogRef: MatDialogRef<MakeChangeDialogComponent>) {
  }

  public close(value: true) {
    this.mdDialogRef.close(value);
  }

  public calculateChange(){
    if(parseFloat(this.moneyGiven) - parseFloat(this.data.totalPrice)/100 >= 0){
      this.changeDue = (parseFloat(this.moneyGiven) - parseFloat(this.data.totalPrice)/100).toFixed(2).toString();
    }else{
      this.changeDue = "invalid change, please check numbers";
    }
  }
}
