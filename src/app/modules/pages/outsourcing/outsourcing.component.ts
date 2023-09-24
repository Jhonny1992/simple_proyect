import { Component, OnInit } from '@angular/core';
import {ServicioOutSourcing} from "../../../model/outsourcing/ServicioOutSourcing";
import {SubServicio} from "../../../model/outsourcing/SubServicio";
import {OutsourcingService} from "../../services/outsourcing/outsourcing.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {of, tap, filter, switchMap} from "rxjs";
import {SubServiceByService} from "../../../model/outsourcing/SubServiceByService";
import {TipoServicio} from "../../../model/helpdesk/TipoServicio";
import {HelpdeskService} from "../../services/helpdesk/helpdesk.service";

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
  numAnalistas: number = 0;

  SeleccionServicio: number = 0;

  totalServicioAndSubservicio: number = 0;
  servicioSeleccionado: number | undefined;

  horasServicio: number = 0;
  cantAnalistas: number = 0;
  tipoModalidad: number = 0;
  totalModalidad: number = 0;
  totalPagarServicios: number = 0;
  totalXHoras: number = 0;

  numUsuarios: number = 0;




  servicioPresionado: boolean = false;
  subServicioPresionado: boolean = false;
  horasIngresadas: boolean = false;
  constructor(private fb: FormBuilder,
              private outsourcingService: OutsourcingService,
              private helpdeskService: HelpdeskService) {
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

  onRadioChangeModalidad(servicio: TipoServicio): void {
    if (servicio) {
      this.SeleccionServicio = 1;
    }
    this.servicioSeleccionado = servicio.porcentaje;
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
      await this.totalPorHoras();
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
  totalPorHoras(): void {
    this.totalXHoras = parseFloat((this.totalPagarServicios / this.horasServicio).toFixed(2));
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
      this.totalXHoras = 0;
  }
}








