import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { DialogService } from './dialog.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MakeChangeDialogComponent } from "./make-change-dialog.component";

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule
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
