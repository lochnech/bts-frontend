import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { DialogService } from './dialog.service';
import { MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from "@angular/forms";
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { AddItemDialogComponent } from './add-item-dialog.component';
import {EditItemDialogComponent} from "./edit-item-dialog.component";
import {ConfirmDeleteDialogComponent} from "./confirm-delete-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule
  ],
  declarations: [
    ConfirmDialogComponent,
    AddItemDialogComponent,
    EditItemDialogComponent,
    ConfirmDeleteDialogComponent
  ],
  exports: [ConfirmDialogComponent, AddItemDialogComponent, EditItemDialogComponent, ConfirmDeleteDialogComponent],
  entryComponents: [ConfirmDialogComponent, AddItemDialogComponent, EditItemDialogComponent, ConfirmDeleteDialogComponent],
  providers: [DialogService]
})

export class DialogModule {
}
