import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { SpendListComponent } from './spend-list/spend-list.component';
import { AddThingsComponent } from './add-things/add-things.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AlertComponent } from './common/alert/alert.component';
import { SpinnerComponent } from './common/loader/spinner/spinner.component';
import { ListComponent } from './credit-card/list/list.component';
import { AddComponent } from './credit-card/add/add.component';
import { PaginationComponent } from './common/pagination/pagination.component';
import { ConfirmationDialogComponent } from './common/confirmation-dialog/confirmation-dialog.component';

// Pipes
import { ConverterStringPipe, ConverterNumberPipe } from './spend-list/converter.pipe';

// Directives
import { HostDirective } from './directives/host.directive';

// interceptors
import { AuthInterceptor } from './interceptor/auth-interceptor';
import { LoaderInterceptor } from './common/loader/loader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SpendListComponent,
    AddThingsComponent,
    ConverterStringPipe,
    ConverterNumberPipe,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    SpinnerComponent,
    ListComponent,
    AddComponent,
    PaginationComponent,
    ConfirmationDialogComponent,
    HostDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
