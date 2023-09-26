import { Component, OnInit } from '@angular/core';
import {SoporteService} from "../../../services/soporte/soporte.service";
import {CotizacionSoporte} from "../../../../model/soporte/CotizacionSoporte";

@Component({
  selector: 'app-listadoSoporte',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class listadoSoporteComponent implements OnInit {

  constructor(private soporteService: SoporteService) { }

  listCotizacionSoporte: CotizacionSoporte[]=[]

  ngOnInit(): void {
    this.listarCotizacionSoporte();
  }

  listarCotizacionSoporte(): void {
    this.soporteService.listarCotizacionSoporte().subscribe({
      next:(res) =>{
        this.listCotizacionSoporte = res;
      }
    })
  }
}