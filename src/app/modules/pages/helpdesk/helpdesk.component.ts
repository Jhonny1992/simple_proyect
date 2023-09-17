import { Component, OnInit } from '@angular/core';
import {HelpdeskService} from "../../services/helpdesk/helpdesk.service";
import {TipoAtencion} from "../../../model/helpdesk/TipoAtencion";

@Component({
  selector: 'app-helpdesk',
  templateUrl: './helpdesk.component.html',
  styleUrls: ['./helpdesk.component.css']
})
export class HelpdeskComponent implements OnInit {

  tipoAtencion: TipoAtencion[] = [];

  constructor(private helpdeskService: HelpdeskService) { }

  ngOnInit(): void {
    this.listTipoAtencion();
  }

  listTipoAtencion(): void{
    this.helpdeskService.listTipoAtencion().subscribe({
      next:(resp) => {
        this.tipoAtencion = resp;
        console.log(this.tipoAtencion)
      }
    })
  }
}
