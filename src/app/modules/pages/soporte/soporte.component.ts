import { Component, OnInit } from '@angular/core';
import {SoporteService} from "../../services/soporte/soporte.service";
import {TipoServicio} from "../../../model/helpdesk/TipoServicio";
import {Servicio} from "../../../model/soporte/Servicio";
import {HorarioAtencion} from "../../../model/soporte/HorarioAtencion";
import {Actividades} from "../../../model/soporte/Actividades";
import {TipoEquipos} from "../../../model/soporte/TipoEquipos";

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.component.html',
  styleUrls: ['./soporte.component.css']
})
export class SoporteComponent implements OnInit {

  tipoServicio: Servicio[]=[];
  horarioAtencion: HorarioAtencion[]=[];
  actividades: Actividades[]=[];
  tipoEquipos: TipoEquipos[] = [];

  constructor(private soporteService: SoporteService) {
    this.listTipoServicio();
    this.listHoraAtencion();
    this.listActividades();
    this.listTipoEquipos();
  }

  ngOnInit(): void {

  }

  listTipoServicio(): void {
    this.soporteService.listTipoServicio().subscribe({
      next: (resp) => {
        this.tipoServicio = resp;
        console.log(this.tipoServicio)
      }
    })
  }

  listHoraAtencion(): void {
    this.soporteService.listHorarioAtencion().subscribe({
      next: (resp) => {
        this.horarioAtencion = resp;
        console.log(this.horarioAtencion)
      }
    })
  }

  listActividades(): void {
    this.soporteService.listActividades().subscribe({
      next: (resp) => {
        this.actividades = resp;
        console.log(this.actividades)
      }
    })
  }

  listTipoEquipos(): void {
    this.soporteService.listTipoEquipos().subscribe({
      next: (resp) => {
        this.tipoEquipos = resp;
        console.log(this.tipoEquipos)
      }
    })
  }

  cotizacion(): void {

  }

}
