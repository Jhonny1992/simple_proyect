import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HelpdeskComponent } from './modules/pages/helpdesk/helpdesk.component';
import { LoginComponent } from './modules/pages/login/login.component';
import {AppRoutingModule} from "./app-routing.module";
import { MainComponent } from './modules/pages/main/main.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { SoporteComponent } from './modules/pages/soporte/soporte.component';
import { OutsourcingComponent } from './modules/pages/outsourcing/outsourcing.component';
import { listadoOutsourcingComponent } from './modules/pages/outsourcing/listado/listado.component';
import { listadoSoporteComponent } from './modules/pages/soporte/listado/listado.component';

@NgModule({
  declarations: [
    AppComponent,
    HelpdeskComponent,
    LoginComponent,
    MainComponent,
    SoporteComponent,
    OutsourcingComponent,
    listadoOutsourcingComponent,
    listadoSoporteComponent

  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
