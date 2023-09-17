import { Component, OnInit } from '@angular/core';
import {HelpdeskService} from "../../services/helpdesk/helpdesk.service";
import {TipoAtencion} from "../../../model/helpdesk/TipoAtencion";
import {Requerimientos} from "../../../model/helpdesk/Requerimientos";

@Component({
  selector: 'app-helpdesk',
  templateUrl: './helpdesk.component.html',
  styleUrls: ['./helpdesk.component.css']
})
export class HelpdeskComponent implements OnInit {

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
