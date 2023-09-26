import { Component, OnInit } from '@angular/core';
import {OutsourcingService} from "../../../services/outsourcing/outsourcing.service";
import {CotizacionOutsourcing} from "../../../../model/outsourcing/CotizacionOutsourcing";

@Component({
  selector: 'app-listadoOutsourcing',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class listadoOutsourcingComponent implements OnInit {

  constructor(private outsourcingService: OutsourcingService) { }

  listCotizacionOutsourcing: CotizacionOutsourcing[]=[]

  ngOnInit(): void {
    this.listarCotizacionOutsourcing();
  }

  listarCotizacionOutsourcing(): void {
    this.outsourcingService.listarCotizacionOutsourcing().subscribe({
      next:(res) =>{
        this.listCotizacionOutsourcing = res;
      }
    })
  }

}