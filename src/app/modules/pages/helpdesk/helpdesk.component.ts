import { Component, OnInit } from '@angular/core';
import {HelpdeskService} from "../../services/helpdesk/helpdesk.service";
import {TipoAtencion} from "../../../model/helpdesk/TipoAtencion";
import {Requerimientos} from "../../../model/helpdesk/Requerimientos";
import {Canales} from "../../../model/helpdesk/Canales";

@Component({
  selector: 'app-helpdesk',
  templateUrl: './helpdesk.component.html',
  styleUrls: ['./helpdesk.component.css']
})
export class HelpdeskComponent implements OnInit {

  tipoAtencion: TipoAtencion[] = [];
  requerimientos: Requerimientos[] = [];
  canales: Canales[] =[];

  precioPorAnalista: number = 0.005;

  cantidadAnalista: number =0;

  precioSeleccionado: number | undefined;

  numero: number = 0;

  constructor(private helpdeskService: HelpdeskService) {
    this.listTipoAtencion2()
    this.listTipoAtencion();
    this.listRequerimientos();
    this.listCanales();



  }

  ngOnInit(): void {
    console.log(this.numero)
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

  listCanales(): void{
    this.helpdeskService.listCanales().subscribe({
      next:(resp) => {
        this.canales = resp;
        console.log(this.canales)
      }
    })
  }

  onRadioChangeAtencion(atencion: TipoAtencion): void {
    this.precioSeleccionado = atencion.precio;
    //this.cantidadAnalista = this.precioSeleccionado*this.precioPorAnalista
    console.log('Precio seleccionado:', this.precioSeleccionado);
  }

  cotizaciones(): void{
    this.cantidadAnalista = Math.ceil(this.numero * this.precioPorAnalista)
    console.log(this.cantidadAnalista)
    console.log(this.precioSeleccionado)
  }

}
