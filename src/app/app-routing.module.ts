import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./modules/pages/login/login.component";
import {HelpdeskComponent} from "./modules/pages/helpdesk/helpdesk.component";
import {MainComponent} from "./modules/pages/main/main.component";
import { SoporteComponent } from './modules/pages/soporte/soporte.component';
import { OutsourcingComponent } from './modules/pages/outsourcing/outsourcing.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'main', component:MainComponent},
  {path:'helpdesk', component:HelpdeskComponent},
  {path:'soporte', component:SoporteComponent},
  {path:'outsourcing', component:OutsourcingComponent},

  {path:'**', redirectTo:'login'}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
