import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { DialogService } from './dialog.service';
import { MatDialogModule} from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { AddItemDialogComponent } from './add-item-dialog.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule
  ],
  declarations: [
    ConfirmDialogComponent,
    AddItemDialogComponent
  ],
  exports: [ConfirmDialogComponent, AddItemDialogComponent],
  entryComponents: [ConfirmDialogComponent, AddItemDialogComponent],
  providers: [DialogService]
})

export class DialogModule {
}
