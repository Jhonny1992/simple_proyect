import { Component, OnInit } from '@angular/core';
import {HelpdeskService} from "../../../services/helpdesk/helpdesk.service";
import {CotizacionHelpdesk} from "../../../../model/helpdesk/CotizacionHelpdesk";

@Component({
  selector: 'app-helpdesk-listar',
  templateUrl: './helpdesk-listar.component.html',
  styleUrls: ['./helpdesk-listar.component.css']
})
export class HelpdeskListarComponent implements OnInit {

  constructor(private helpdeskService: HelpdeskService) { }

  listCotizacion: CotizacionHelpdesk[]=[]

  ngOnInit(): void {
    this.listarCotizacion();
  }

  listarCotizacion(): void {
    this.helpdeskService.listarCotizacion().subscribe({
      next:(res) =>{
        this.listCotizacion = res;
      }
    })
  }

}
