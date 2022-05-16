import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { DialogService } from './dialog.service';
import { MatDialogModule} from '@angular/material/dialog';
import { FormsModule} from "@angular/forms";
import { ViewItemsDialogComponent } from "./transaction-dialogs/view-items-dialog.component";
import { MatTableModule } from "@angular/material/table";
import { ConfirmDialogComponent } from './transaction-dialogs/confirm-dialog.component';
import { AddItemDialogComponent } from './item-dialogs/add-item-dialog.component';
import { EditItemDialogComponent } from "./item-dialogs/edit-item-dialog.component";
import { ConfirmDeleteDialogComponent } from "./confirm-delete-dialog.component";
import { MakeChangeDialogComponent } from "./transaction-dialogs/make-change-dialog.component";
import { AddUserDialogComponent } from "./user-dialogs/add-user-dialog.component";
import { EditUserDialogComponent } from "./user-dialogs/edit-user-dialog.component";

@NgModule({
    imports: [
        CommonModule,
        MatDialogModule,
        FormsModule,
        MatTableModule
    ],
  declarations: [
    ConfirmDialogComponent,
    AddItemDialogComponent,
    EditItemDialogComponent,
    AddUserDialogComponent,
    EditUserDialogComponent,
    ConfirmDeleteDialogComponent,
    MakeChangeDialogComponent,
    ViewItemsDialogComponent
  ],
  exports: [
    ConfirmDialogComponent,
    AddItemDialogComponent,
    EditItemDialogComponent,
    AddUserDialogComponent,
    EditUserDialogComponent,
    ConfirmDeleteDialogComponent,
    MakeChangeDialogComponent,
    ViewItemsDialogComponent
  ],
  entryComponents: [
    ConfirmDialogComponent,
    AddItemDialogComponent,
    EditItemDialogComponent,
    AddUserDialogComponent,
    EditUserDialogComponent,
    ConfirmDeleteDialogComponent,
    MakeChangeDialogComponent,
    ViewItemsDialogComponent
  ],
  providers: [DialogService]
})

export class DialogModule {
}
