import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { DialogService } from './dialog.service';
import { MatDialogModule} from '@angular/material/dialog';
import { FormsModule} from "@angular/forms";
import { ConfirmDialogComponent } from './transaction-dialogs/confirm-dialog.component';
import { AddItemDialogComponent } from './item-dialogs/add-item-dialog.component';
import { EditItemDialogComponent } from "./item-dialogs/edit-item-dialog.component";
import { ConfirmDeleteDialogComponent } from "./confirm-delete-dialog.component";
import { MakeChangeDialogComponent } from "./transaction-dialogs/make-change-dialog.component";
import {AddUserDialogComponent} from "./user-dialogs/add-user-dialog.component";
import {EditUserDialogComponent} from "./user-dialogs/edit-user-dialog.component";

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
    AddUserDialogComponent,
    EditUserDialogComponent,
    ConfirmDeleteDialogComponent,
    MakeChangeDialogComponent
  ],
  exports: [ConfirmDialogComponent, AddItemDialogComponent, EditItemDialogComponent, AddUserDialogComponent, EditUserDialogComponent, ConfirmDeleteDialogComponent, MakeChangeDialogComponent],
  entryComponents: [ConfirmDialogComponent, AddItemDialogComponent, EditItemDialogComponent, AddUserDialogComponent, EditUserDialogComponent, ConfirmDeleteDialogComponent, MakeChangeDialogComponent],
  providers: [DialogService]
})

export class DialogModule {
}
