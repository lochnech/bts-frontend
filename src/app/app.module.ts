// components
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SalesComponent } from './sales/sales.component';
import { InventoryComponent } from './inventory/inventory.component';
import { NavbarComponent } from './navbar/navbar.component';

//modules
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DialogModule } from "./dialogs/dialog.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";

// services
import { AuthGuardService } from "./services/auth-guard.service";
import { DialogService } from "./dialogs/dialog.service";
import { SnackbarService } from "./services/snackbar.service";

// misc
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { Interceptor } from "./models/interceptor";
import { SignInComponent } from './sign-in/sign-in.component';
import { ViewUsersComponent } from './view-users/view-users.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SalesComponent,
    InventoryComponent,
    NavbarComponent,
    SignInComponent,
    ViewUsersComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        DialogModule,
        FormsModule,
        HttpClientModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatSnackBarModule,
        MatTableModule,
        ReactiveFormsModule,
        MatSortModule,
    ],
  providers: [
    AppComponent,
    AuthGuardService,
    DialogService,
    NavbarComponent,
    SnackbarService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
