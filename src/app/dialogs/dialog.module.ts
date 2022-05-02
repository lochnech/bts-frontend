import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { DialogService } from './dialog.service';
import { MatDialogModule} from '@angular/material/dialog';
import { FormsModule} from "@angular/forms";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AddItemDialogComponent } from './add-item-dialog/add-item-dialog.component';
import { EditItemDialogComponent } from "./edit-item-dialog/edit-item-dialog.component";
import { ConfirmDeleteDialogComponent } from "./confirm-delete-dialog/confirm-delete-dialog.component";
import { MakeChangeDialogComponent } from "./make-change-dialog/make-change-dialog.component";
import { ViewItemsDialogComponent } from "./view-items-dialog/view-items-dialog.component";
import { MatTableModule } from "@angular/material/table";

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
    ConfirmDeleteDialogComponent,
    MakeChangeDialogComponent,
    ViewItemsDialogComponent
  ],
  exports: [
    ConfirmDialogComponent,
    AddItemDialogComponent,
    EditItemDialogComponent,
    ConfirmDeleteDialogComponent,
    MakeChangeDialogComponent,
    ViewItemsDialogComponent
  ],
  entryComponents: [
    ConfirmDialogComponent,
    AddItemDialogComponent,
    EditItemDialogComponent,
    ConfirmDeleteDialogComponent,
    MakeChangeDialogComponent,
    ViewItemsDialogComponent
  ],
  providers: [DialogService]
})

export class DialogModule {
}
