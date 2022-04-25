import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { DialogService } from './dialog.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MakeChangeDialogComponent } from "./make-change-dialog.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule
  ],
  declarations: [
    ConfirmDialogComponent,
    MakeChangeDialogComponent
  ],
  exports: [ConfirmDialogComponent, MakeChangeDialogComponent],
  entryComponents: [ConfirmDialogComponent, MakeChangeDialogComponent],
  providers: [DialogService]
})

export class DialogModule {
}
