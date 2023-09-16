import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HelpdeskComponent } from './modules/pages/helpdesk/helpdesk.component';
import { LoginComponent } from './modules/pages/login/login.component';
import {AppRoutingModule} from "./app-routing.module";
import { MainComponent } from './modules/pages/main/main.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HelpdeskComponent,
    LoginComponent,
    MainComponent,

  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
