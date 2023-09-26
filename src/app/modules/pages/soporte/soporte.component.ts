import { Component, OnInit } from '@angular/core';
import {SoporteService} from "../../services/soporte/soporte.service";
import {TipoServicio} from "../../../model/helpdesk/TipoServicio";
import {Servicio} from "../../../model/soporte/Servicio";
import {HorarioAtencion} from "../../../model/soporte/HorarioAtencion";
import {Actividades} from "../../../model/soporte/Actividades";
import {TipoEquipos} from "../../../model/soporte/TipoEquipos";
import {TipoAtencion} from "../../../model/helpdesk/TipoAtencion";
import {Requerimientos} from "../../../model/helpdesk/Requerimientos";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

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

  tipServicioSeleccionado: number = 0;
  horarioAtencionSeleccionado: number = 0;

  precioTotalActividades: number = 0;
  precioTotalEquipos: number = 0;

  sumaActivEquip: number = 0;

  numEquipos: number = 0;

  cantidadEquipo: number = 0;
  cantidadActividades: number = 0;

  neto: number = 0;

  costoPorHorario: number = 0;

  selectedActividades: number = 0;
  selectedEquipos: number = 0;
  selectedHorario: number = 0;

  tipoSoporte:string = ''
  horarioSoporte:string = ''
  SoporteCotizacion: any = {
    nroCotizacionSoporte : '',
    servicio : '',
    subServicio : '',
    horas : '',
    personal : '',
    tipo : '',
    costoXServicio : ''
  }

  constructor(private soporteService: SoporteService,
    private route: Router,
    private toastr: ToastrService) {
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

  /*onRadioChangeServicio(servicio: TipoServicio): void {
    if (servicio) {
      this.selectedHorario = 1;
    }
    this.selectedHorario = servicio.porcentaje;
    console.log('Precio seleccionado:', this.horarioAtencionSeleccionado);
  }*/

  onRadioChangeTipServicio(servicio: Servicio): void {
    this.tipServicioSeleccionado = servicio.precio;
    this.tipoSoporte = servicio.descripcion;
    console.log('tipoSoporte:', this.tipoSoporte);
    console.log('costo servicio:', this.tipServicioSeleccionado);
  }

  onRadioChangeHorarioAtencion(horario: HorarioAtencion): void {
    if (horario) {
      this.selectedHorario = 1;
    }
    this.horarioAtencionSeleccionado = horario.porcentaje;
    this.horarioSoporte = horario.descripcion;
    console.log('horarioSoporte:', this.horarioSoporte);
  }

  onCheckboxActividades(actividades: Actividades): void {
    if (actividades.selected === true) {
      this.selectedActividades -= 1
    } else {
      this.selectedActividades += 1
    }
  }
  onCheckboxEquipos(equipos: TipoEquipos): void {
    if (equipos.selected === true) {
      this.selectedEquipos -= 1
    } else {
      this.selectedEquipos += 1
    }
  }


  actividadesTotal(): void {

    const auxCantidadActividades = this.actividades.filter(req => req.selected)
    this.cantidadActividades = auxCantidadActividades.length

    const auxPrecioTotalActividades = this.actividades.filter(req => req.selected)
      .reduce((total, req) => total + req.precio, 0);
    this.precioTotalActividades = auxPrecioTotalActividades;
    // console.log(this.precioTotalActividades);

  }

  equiposTotal(): void {
    const auxCantidad = this.tipoEquipos.filter(req => req.selected)
    this.cantidadEquipo = auxCantidad.length

    const auxprecioTotalEquipos = this.tipoEquipos.filter(req => req.selected)
      .reduce((total, req) => total + req.precio, 0);
    this.precioTotalEquipos = auxprecioTotalEquipos;
    // console.log(this.precioTotalEquipos);
  }

  porcentajeHorario(): void {
    let sumaTotal=0;
    if (this.horarioAtencionSeleccionado !=0){
      sumaTotal =((this.precioTotalActividades + this.precioTotalEquipos) * this.horarioAtencionSeleccionado) + (this.precioTotalActividades + this.precioTotalEquipos)

    }else{
      sumaTotal = this.precioTotalActividades + this.precioTotalEquipos
    }
    this.sumaActivEquip = sumaTotal
    // console.log(this.sumaActivEquip)
  }

  porcentajePorHorario(){
    this.costoPorHorario = (this.precioTotalActividades + this.precioTotalEquipos) * this.horarioAtencionSeleccionado
  }

  cantEquipoPorSumaActEquip(): void {
   this.neto =  this.sumaActivEquip * this.numEquipos;
  //  console.log(this.neto)
  }



  async cotizacion() {
    if (!this.validarCampos()) {
      return;
    }
    console.log('numEquipos:', this.numEquipos);
      await this.actividadesTotal();
      await this.equiposTotal();
      await this.porcentajeHorario();
      await this.porcentajePorHorario();
      await this.cantEquipoPorSumaActEquip();
  }

  validarCampos(): boolean {
    // Aquí debes incluir la lógica para verificar que todos los campos estén llenos o seleccionados.
    if (!this.tipServicioSeleccionado) {
      alert('Seleccione un Tipo de servicio.');
      return false;
    }

    if (this.selectedHorario === 0) {
      alert('Seleccione horario');
      return false;
    }

    if (this.selectedActividades === 0) {
      alert('Seleccione al menos una Actividad.');
      return false;
    }

    if (!this.numEquipos) {
      alert('Ingrese la Cantidad de Usuarios.');
      return false;
    }

    if (this.selectedEquipos === 0) {
      alert('Seleccione al menos un equipo.');
      return false;
    }


    return true;
  }

  grabarCotizacionSoporte(): void {
    if (!this.validarCampos()) {
      return; // Si hay campos vacíos, no continúa
    }
    // if(!this.pagoAnios){
    //   this.toastr.warning("Debe generar cotización")
    //   return
    // }
    this.SoporteCotizacion ={
        tipoSoporte: this.tipoSoporte,
        horarioSoporte: this.horarioSoporte,
        canEquiposSoporte: this.numEquipos,
        costoServicioSoporte: this.tipServicioSeleccionado
    }

    this.soporteService.grabarCotizacionSoporte(this.SoporteCotizacion).subscribe({
      next:(res) => {
        this.toastr.success("Se guardó exitosamente")
        console.log(res);
      }
    })
}
verCotizacionSoporte(): void {
  this.route.navigate(['/listar-soporte'])

}

}
