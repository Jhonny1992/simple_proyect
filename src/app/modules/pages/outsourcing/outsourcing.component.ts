import { Component, OnInit } from '@angular/core';
import {ServicioOutSourcing} from "../../../model/outsourcing/ServicioOutSourcing";
import {SubServicio} from "../../../model/outsourcing/SubServicio";
import {OutsourcingService} from "../../services/outsourcing/outsourcing.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {of, tap, filter, switchMap} from "rxjs";
import {SubServiceByService} from "../../../model/outsourcing/SubServiceByService";
import {TipoServicio} from "../../../model/helpdesk/TipoServicio";
import {HelpdeskService} from "../../services/helpdesk/helpdesk.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-outsourcing',
  templateUrl: './outsourcing.component.html',
  styleUrls: ['./outsourcing.component.css']
})
export class OutsourcingComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    servicio:['',Validators.required],
    subServicio:['',Validators.required],
    horasServicio:['',Validators.required],
    cantAnalistas:['',Validators.required],
    tipoModalidad:['',Validators.required]

  })

  servicios: ServicioOutSourcing[] = [];
  subServicios: SubServicio[]=[]
  modalidades: TipoServicio[] = [];

  precioSubServicioSeleccionado: number = 0;
  numHoras: number = 0;

  SeleccionModalidad: number = 0;

  totalServicioAndSubservicio: number = 0;
  servicioSeleccionado: number | undefined;

  nombreservicio: string = '';
  nombresubservicio: string = '';
  horasServicio: number = 0;
  cantAnalistas: number = 0;
  tipoModalidad: number = 0;
  totalModalidad: number = 0;
  totalPagarServicios: number = 0;

  numUsuarios: number = 0;


  servicioPresionado: boolean = false;
  subServicioPresionado: boolean = false;
  horasIngresadas: boolean = false;
  OutsourcingCotizacion: any = {
    nroCotizacion : '',
    servicio : '',
    subServicio : '',
    horas : '',
    personal : '',
    tipo : '',
    costoXServicio : ''
  }
  constructor(private fb: FormBuilder,
              private outsourcingService: OutsourcingService,
              private helpdeskService: HelpdeskService,
              private route: Router,
              private toastr: ToastrService) {
  }


  ngOnInit(): void {
    this.listService();
    this.listTipoModalidad();

    this.myForm.get("servicio")?.valueChanges.pipe(

      tap((_) =>{
        this.myForm.get('subServicio')?.reset('');
      }),
      switchMap(servicio => this.outsourcingService.listSubServicesByService(servicio))
    ).subscribe({
      next:(res2) => {
        this.subServicios = res2;
      }
    })
  }

  listService(): void{
    this.outsourcingService.listservicios().subscribe((data) => {
      this.servicios = data;
    });
  }

  listTipoModalidad(): void {
    this.helpdeskService.listTipoServicio().subscribe({
      next: (resp) => {
        this.modalidades= resp;
        console.log(this.modalidades)
      }
    })
  }

  onRadioChangeModalidad(modalidad: TipoServicio): void {
    if (modalidad) {
      this.SeleccionModalidad = 1;
    }
    this.servicioSeleccionado = modalidad.porcentaje;
    console.log('Precio seleccionado:', this.servicioSeleccionado);
  }

  async onSubmit() {

    this.servicioPresionado = true;
    this.subServicioPresionado = true;
    this.horasIngresadas = true;

    const selectedSubServicio = this.myForm.get('subServicio')?.value;
    this.precioSubServicioSeleccionado = selectedSubServicio;
    console.log("precio subservicio: " + this.precioSubServicioSeleccionado)
    this.horasServicio = this.myForm.get('horasServicio')?.value;
    this.cantAnalistas = this.myForm.get('cantAnalistas')?.value;
    this.tipoModalidad = this.myForm.get('tipoModalidad')?.value;
    console.log("horasServicio: " + this.horasServicio)
    console.log("horasServicio: " + this.horasServicio)
    console.log("cantidad analistas: " + this.cantAnalistas)
    console.log("tipoModalidad: " + this.tipoModalidad)
    if(this.myForm.get('servicio')?.value == '' || this.myForm.get('servicio')?.value == null){
      window.alert('El servicio es requerido.');
    }else if(this.myForm.get('subServicio')?.value == '' || this.myForm.get('subServicio')?.value == null){
      window.alert('El sub-servicio es requerido.');
    }else if(this.myForm.get('horasServicio')?.value == '' || this.myForm.get('horasServicio')?.value == null){
      window.alert('El campo hora es requerido.');
    }else if(this.myForm.get('cantAnalistas')?.value == '' || this.myForm.get('cantAnalistas')?.value == null){
      window.alert('El campo cantidad de analistas es requerido.');
    }else if(this.myForm.get('tipoModalidad')?.value == '' || this.myForm.get('tipoModalidad')?.value == null){
      window.alert('La modalidad es requerido.');
    } else{
      console.log( this.myForm)
      await this.precioServicioAndSubServicio();
      await this.precioModalidad();
      await this.totalPagar();
    }



  }

  precioServicioAndSubServicio(): void{
    this.totalServicioAndSubservicio = this.precioSubServicioSeleccionado * this.horasServicio * this.cantAnalistas;
    console.log(this.totalServicioAndSubservicio)
  }

  precioModalidad(): void {
    let auxTotalModalidad = this.totalServicioAndSubservicio * this.tipoModalidad;
    this.totalModalidad = parseFloat(auxTotalModalidad.toFixed(2));
  }

  totalPagar(): void {
    this.totalPagarServicios = this.totalServicioAndSubservicio + this.totalModalidad;
  }

  cleanForm(): void {
    console.log(this.myForm);
    this.myForm.reset();
    this.myForm.get('servicio')?.patchValue('');
    this.myForm.get('subServicio')?.patchValue('');
      this.servicioPresionado = false;
      this.subServicioPresionado = false;
      this.horasIngresadas = false;
      this.totalServicioAndSubservicio =0;
      this.totalModalidad = 0;
      this.totalPagarServicios =0;
  }

  validarCamposOutsourcing(): boolean {
    // Aquí debes incluir la lógica para verificar que todos los campos estén llenos o seleccionados.
    if (!this.myForm.get('servicio')?.value) {
      alert('Seleccione un Servicio.');
      return false;
    }

    if (!this.myForm.get('subServicio')?.value) {
      alert('Seleccione un Subservicio.');
      return false;
    }

    if (!this.myForm.get('horasServicio')?.value) {
      alert('Ingrese las horas por Servicio.');
      return false;
    }

    if (!this.myForm.get('cantAnalistas')?.value) {
      alert('Seleccione la cantidad de Analistas.');
      return false;
    }

    if (!this.myForm.get('tipoModalidad')?.value) {
      alert('Seleccione el Tipo de Modalidad.');
      return false;
    }

    return true;
  }

  grabarCotizacionOutsourcing(): void {
    if (!this.validarCamposOutsourcing()) {
      return; // Si hay campos vacíos, no continúa
    }
    // if(!this.totalPagarServicios){
    //   this.toastr.warning("Debe generar cotización")
    //   return
    // }
    this.OutsourcingCotizacion ={
        servicio : this.servicioPresionado,
        subservicio : this.subServicioPresionado,
        horas : this.horasServicio,
        analistas : this.cantAnalistas,
        modalidad : this.tipoModalidad,
        costoXSubservicio : this.precioSubServicioSeleccionado
    }

    this.outsourcingService.grabarCotizacionOutsourcing(this.OutsourcingCotizacion).subscribe({
      next:(res) => {
        this.toastr.success("Se guardo exitosamente")
        console.log(res);
      }
    })
  }
}








