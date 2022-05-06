import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from "./welcome/welcome.component";
import { SalesComponent } from "./sales/sales.component";
import { InventoryComponent } from "./inventory/inventory.component";
import { AuthGuardService } from "./services/auth-guard.service";
import {SignInComponent} from "./sign-in/sign-in.component";

const routes: Routes = [
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'sales', component: SalesComponent, canActivate: [AuthGuardService]},
  {path: 'inventory', component: InventoryComponent, canActivate: [AuthGuardService]},
  {path: 'signIn', component: SignInComponent},
  {path: '**', redirectTo: '/welcome'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
