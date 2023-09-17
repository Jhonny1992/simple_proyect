import { Component, OnInit } from '@angular/core';
import {HelpdeskService} from "../../services/helpdesk/helpdesk.service";
import {TipoAtencion} from "../../../model/helpdesk/TipoAtencion";
import {Requerimientos} from "../../../model/helpdesk/Requerimientos";

@Component({
  selector: 'app-outsourcing',
  templateUrl: './outsourcing.component.html',
  styleUrls: ['./outsourcing.component.css']
})
export class OutsourcingComponent implements OnInit {

  tipoAtencion: TipoAtencion[] = [];
  requerimientos: Requerimientos[] = [];

  constructor(private helpdeskService: HelpdeskService) {
    this.listTipoAtencion();
    this.listRequerimientos();
    this.listTipoAtencion2()
  }

  ngOnInit(): void {

  }

  listTipoAtencion2(): void{
    this.helpdeskService.listTipoAtencion2().subscribe({
      next:(resp) => {
        console.log(resp)
      }
    })
  }

  listTipoAtencion(): void{
    this.helpdeskService.listTipoAtencion().subscribe({
      next:(resp) => {
        this.tipoAtencion = resp;
        console.log(this.tipoAtencion)
      }
    })
  }
  listRequerimientos(): void{
    this.helpdeskService.listRequerimientos().subscribe({
      next:(resp) => {
        this.requerimientos = resp;
        console.log(this.requerimientos)
      }
    })
  }
}
