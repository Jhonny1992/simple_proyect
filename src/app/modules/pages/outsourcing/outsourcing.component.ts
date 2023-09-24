import { Component, OnInit } from '@angular/core';
import {ServicioOutSourcing} from "../../../model/outsourcing/ServicioOutSourcing";
import {SubServicio} from "../../../model/outsourcing/SubServicio";
import {OutsourcingService} from "../../services/outsourcing/outsourcing.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {of, tap, filter, switchMap} from "rxjs";
import {SubServiceByService} from "../../../model/outsourcing/SubServiceByService";

@Component({
  selector: 'app-outsourcing',
  templateUrl: './outsourcing.component.html',
  styleUrls: ['./outsourcing.component.css']
})
export class OutsourcingComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    servicio:['',Validators.required],
    subServicio:['',Validators.required],

  })

  servicios: ServicioOutSourcing[] = [];

  subServicios: SubServicio[]=[]

  numUsuarios: number = 0;
  constructor(private fb: FormBuilder,
              private outsourcingService: OutsourcingService) {
  }

  ngOnInit(): void {
    this.listService();

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

  onSubmit(): void {
    // Obtener el valor seleccionado de subServicio
    const selectedSubServicio = this.myForm.get('subServicio')?.value;

    // Puedes utilizar "selectedSubServicio" aquí según tus necesidades
    console.log("SubServicio seleccionado:", selectedSubServicio);
  }







}
