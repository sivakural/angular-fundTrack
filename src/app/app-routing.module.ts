import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddThingsComponent } from './add-things/add-things.component';
import { AddComponent } from './credit-card/add/add.component';
import { ListComponent } from './credit-card/list/list.component';
import { SpendListComponent } from './spend-list/spend-list.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: "/management", pathMatch: 'full' },
  { path: "management", title: "Login user", component: LoginComponent },
  { path: "register", title: "Register user", component: RegisterComponent },
  { path: "spendlist", title: 'Spendlist component', component: SpendListComponent },
  { path: "addthings", title: "Add Things Component", component: AddThingsComponent },
  { path: "updatethings", title: "Edit Things Component", component: AddThingsComponent },
  { path: 'creditCard-list', title: 'Show credit card list', component: ListComponent },
  { path: "addCredit", title: "Add Credit Card expenses", component: AddComponent },
  { path: 'updateCredit', title: "Edit Credit card", component: AddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
