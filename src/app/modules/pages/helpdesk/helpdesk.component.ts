import { Component, OnInit } from '@angular/core';
import {HelpdeskService} from "../../services/helpdesk/helpdesk.service";
import {TipoAtencion} from "../../../model/helpdesk/TipoAtencion";
import {Requerimientos} from "../../../model/helpdesk/Requerimientos";
import {Canales} from "../../../model/helpdesk/Canales";
import {Dias} from "../../../model/helpdesk/Dias";
import {TipoServicio} from "../../../model/helpdesk/TipoServicio";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-helpdesk',
  templateUrl: './helpdesk.component.html',
  styleUrls: ['./helpdesk.component.css']
})
export class HelpdeskComponent implements OnInit {

  tipoAtencion: TipoAtencion[] = [];
  requerimientos: Requerimientos[] = [];
  canales: Canales[] = [];
  dias: Dias[] = [];
  servicios: TipoServicio[] = [];

  precioPorAnalista: number = 0.005;
  PRECIO_PREMIUM_ONSITE: number = 3500

  cantidadAnalista: number = 0;
  cantidadSelecReq: number = 0;
  cantidadSelectCanales: number = 0;


  AtencionSeleccionado: number = 0;
  servicioSeleccionado: number | undefined;

  selectedRequerimientos: number = 0;
  selectedCanal: number = 0;

  numUsuarios: number = 0;
  añoSeleccionado: number = 0;
  totalRequerimientos: number = 0;
  totalCanales: number = 0;

  horaInicioJornada: string = '';
  horaFinJornada: string = '';
  precioJornada: number = 0;
  precioXAnalista: number = 0;

  horaAproximada: number = 0;

  SeleccionServicio: number = 0;

  PRECIO_BASE_JORNADA: number = 3000;


  precioServicio: number | undefined = 0;

  verAnio: any

  pagoAnios: number = 0;

  pagoTotal: number = 0;

  tipoAtencionSeleccionado: string ='';
  modalidadSeleccionado: string = '';
  duracionServicioSeleccionado: string = '';


  // datos para guardar
  codigoAtencion: string = '';
  nombreServicio: string = '';
  anios: string ='';
  userName: string | null = '';
  nombreAtencion: string = '';

  HelpdeskCotizacion: any = {
    nroCotizacion : '',
    servicio : '',
    subServicio : '',
    horas : '',
    personal : '',
    tipo : '',
    costoXServicio : ''
  }
  constructor(private helpdeskService: HelpdeskService,
              private authService: AuthService,
              private route: Router,
              private toastr: ToastrService) {

    console.log(this.userName);
    this.listTipoAtencion();
    this.listRequerimientos();
    this.listCanales();
    this.listDias();
    this.listTipoServicio();
  }

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
  }

  listTipoAtencion(): void {
    this.helpdeskService.listTipoAtencion().subscribe({
      next: (resp) => {
        this.tipoAtencion = resp;
        console.log(this.tipoAtencion)
      }
    })
  }

  listDias(): void {
    this.helpdeskService.listDias().subscribe({
      next: (resp) => {
        this.dias = resp;
        console.log(this.dias)
      }
    })
  }

  listRequerimientos(): void {
    this.helpdeskService.listRequerimientos().subscribe({
      next: (resp) => {
        this.requerimientos = resp;
        console.log(this.requerimientos)
      }
    })
  }

  listCanales(): void {
    this.helpdeskService.listCanales().subscribe({
      next: (resp) => {
        this.canales = resp;
        console.log(this.canales)
      }
    })
  }

  listTipoServicio(): void {
    this.helpdeskService.listTipoServicio().subscribe({
      next: (resp) => {
        this.servicios = resp;
        console.log(this.servicios)
      }
    })
  }

  // OBTENIENDO LOS CHECKBOX O RADIOBUTTON SELECCIONADOS
  onRadioChangeAtencion(atencion: TipoAtencion): void {
    this.AtencionSeleccionado = atencion.precio;
    this.codigoAtencion = atencion.codigo;
    this.nombreAtencion = atencion.nombre;
    console.log('Precio seleccionado:', this.AtencionSeleccionado);
  }

  onRadioChangeAno(event: any): void {
    this.añoSeleccionado = event.target.value;
    if (this.añoSeleccionado == 12) {
      this.verAnio = "1";
      this.anios = "1 año"
    } else if (this.añoSeleccionado == 24) {
      this.verAnio = "2"
      this.anios = "2 años"
    } else {
      this.verAnio = "3 a más"
      this.anios = "3 años a más"
    }
    console.log('Duración seleccionada:', this.añoSeleccionado);
  }

  onRadioChangeServicio(servicio: TipoServicio): void {
    if (servicio) {
      this.SeleccionServicio = 1;
    }
    this.servicioSeleccionado = servicio.porcentaje;
    this.nombreServicio = servicio.descripcion
    console.log('Precio seleccionado:', this.servicioSeleccionado);
  }

  onCheckboxRequerimiento(requerimiento: Requerimientos): void {
    if (requerimiento.selected === true) {
      this.selectedRequerimientos -= 1
    } else {
      this.selectedRequerimientos += 1
    }
  }

  onCheckboxCanal(canal: Canales): void {
    if (canal.selected === true) {
      this.selectedCanal -= 1
    } else {
      this.selectedCanal += 1
    }
  }

  // TODA LA LOGICA PARA COTIZAR
  async cotizaciones() {

    // SI TODOS LOS CAMPOS ESTÁN LLENOS CONTINUA, SINO, NO.
    if (!this.validarCampos()) {
      return;
    }

    await this.cantidadAnalistas();
    await this.CaracteristicasRequeridas();
    await this.canalesAtencion();
    await this.calcularHoraAproximada();
    await this.precioTotalHoracioAtencion();
    await this.costoPorAnalista();

    await this.pagoTotalCotizacion();
    //quitarlo cuando finalice pruebas
    this.calcularDias()
  }

  cantidadAnalistas(): void {
    this.cantidadAnalista = Math.ceil(this.numUsuarios * this.precioPorAnalista)
  }

  CaracteristicasRequeridas(): void {
    const auxRequerimientosSeleccionados = this.requerimientos.filter(req => req.selected);

    this.cantidadSelecReq = auxRequerimientosSeleccionados.length;

    //Suma de los cuatro primeros requerimientos
    const sumaRequerimientos = auxRequerimientosSeleccionados
      .filter(req => ['01', '02', '03', '04'].includes(req.codigo))
      .reduce((total, req) => total + req.precio, 0);

    // Suma de los dos ultimos requerimientos.
    const sumaReqTickets = auxRequerimientosSeleccionados
      .filter(req => ['05', '06'].includes(req.codigo))
      .reduce((total, req) => {
        if (req.codigo === '05') {
          return total + req.precio * this.numUsuarios * 12;
        } else if (req.codigo === '06') {
          return total + (req.precio * this.numUsuarios) * this.PRECIO_PREMIUM_ONSITE * 12;
        }
        return total;
      }, 0);

    // Total
    this.totalRequerimientos = sumaReqTickets + sumaRequerimientos

  }

  canalesAtencion() {
    let auxCanalesSeleccionados = 0;
    this.cantidadSelectCanales = this.canales.filter(req => req.selected).length;

    if (this.AtencionSeleccionado !== undefined) {
      auxCanalesSeleccionados = this.canales.filter(req => req.selected)
        .map(req => {
          if (this.AtencionSeleccionado !== undefined) {
            let prueba = req.porcentaje * this.AtencionSeleccionado
            console.log(prueba)
            return req.porcentaje * this.AtencionSeleccionado;
          } else {
            return 0;
          }
        })
        .reduce((total, precio) => total + precio, 0);

      console.log(auxCanalesSeleccionados);
    }
    this.totalCanales = auxCanalesSeleccionados
  }

  precioTotalHoracioAtencion() {
    this.calcularHoraAproximada();

  }

  calcularHoraAproximada() {
    const inicio = new Date(`2023-09-16T${this.horaInicioJornada}`);
    const fin = new Date(`2023-09-16T${this.horaFinJornada}`);

    const diferenciaEnMilisegundos = fin.getTime() - inicio.getTime();
    const minutos = Math.floor(diferenciaEnMilisegundos / (1000 * 60));

    // Calcula la hora aproximada redondeando hacia arriba si los minutos son mayores a 30
    this.horaAproximada = Math.ceil(minutos / 60);
    let auxPrecioJornada = 0;
    if (this.horaAproximada <= 8) {
      auxPrecioJornada = this.PRECIO_BASE_JORNADA
    } else if (this.horaAproximada > 8 && this.horaAproximada < 12) {
      auxPrecioJornada = Math.round(this.PRECIO_BASE_JORNADA * 1.1)
    } else if (this.horaAproximada > 12) {
      auxPrecioJornada = Math.round(this.PRECIO_BASE_JORNADA * 1.2)
    }
    this.precioJornada = auxPrecioJornada

  }

  async costoPorAnalista() {
    await this.tiposServicios()
    console.log(this.AtencionSeleccionado)
    if (this.AtencionSeleccionado == 3000) {
      console.log(this.precioServicio!)
      this.precioXAnalista = this.precioServicio! + this.precioJornada;
    } else {
      this.precioXAnalista = this.precioServicio! + this.AtencionSeleccionado
    }


  }

  calcularDias() {
    const auxDiasSeleccionados = this.dias.filter(req => req.selected);
    console.log(auxDiasSeleccionados)
  }

  tiposServicios() {
    if (this.AtencionSeleccionado == 3000) {
      if (this.servicioSeleccionado !== undefined) {
        this.precioServicio = this.servicioSeleccionado * this.precioJornada
      }
    } else {
      if (this.servicioSeleccionado !== undefined) {
        this.precioServicio = this.servicioSeleccionado * this.AtencionSeleccionado
      }
    }

  }

  pagoTotalCotizacion() {
    const diasSeleccionados = this.dias.filter(req => req.selected);
    const porcentajesSeleccionados = diasSeleccionados.map(dia => dia.porcentaje);
    const productoPorcentajes = porcentajesSeleccionados.reduce((total, porcentaje) => total * porcentaje, 1);
    this.pagoTotal = (this.cantidadAnalista * this.precioXAnalista * 12 * productoPorcentajes) + this.totalRequerimientos;
    this.pagoTotal = parseFloat(this.pagoTotal.toFixed(2));
    this.pagoAnios = this.pagoTotal;
    if (this.verAnio == "2") {
      this.pagoAnios = this.pagoTotal * 0.95 * 2;
      this.pagoAnios = parseFloat(this.pagoAnios.toFixed(2));
      this.pagoTotal = this.pagoTotal * 0.95;
    } else if (this.verAnio == "3 a más") {
      this.pagoAnios = this.pagoTotal * 0.90 * 3
      this.pagoAnios = parseFloat(this.pagoAnios.toFixed(2));
      this.pagoTotal = this.pagoTotal * 0.90;
    }
  }

  validarCampos(): boolean {
    // Aquí debes incluir la lógica para verificar que todos los campos estén llenos o seleccionados.
    if (!this.AtencionSeleccionado) {
      alert('Seleccione un Tipo de Atención.');
      return false;
    }

    if (!this.añoSeleccionado) {
      alert('Seleccione la Duración del Servicio.');
      return false;
    }

    if (this.selectedRequerimientos === 0) {
      alert('Seleccione al menos una Característica Requerida.');
      return false;
    }

    if (this.selectedCanal === 0) {
      alert('Seleccione al menos un Canal de Atención.');
      return false;
    }

    if (!this.horaInicioJornada || !this.horaFinJornada) {
      alert('Ingrese las horas de Inicio y Fin de Jornada.');
      return false;
    }

    if (!this.numUsuarios) {
      alert('Ingrese la Cantidad de Usuarios.');
      return false;
    }

    if (!this.SeleccionServicio) {
      alert('Seleccione un Tipo de Servicio.');
      return false;
    }

    return true;
  }

  cleanFields(): void {
    // Resetea los valores de los campos a sus valores iniciales o vacíos
    this.selectedCanal = 0;
    this.horaInicioJornada = '';
    this.horaFinJornada = '';
    this.numUsuarios = 0;
    this.SeleccionServicio = 0;
    this.cantidadAnalista=0;
    this.precioXAnalista = 0;
    this.AtencionSeleccionado =0;
    this.cantidadSelecReq = 0;
    this.totalRequerimientos = 0;
    this.cantidadSelectCanales =0;
    this.totalCanales = 0;
    this.horaAproximada = 0;
    this.precioJornada = 0;
    this.precioServicio = 0;
    this.pagoTotal = 0;
    this.verAnio = '';
    this.pagoAnios = 0;

    // Resetea los valores de los radio buttons
    this.tipoAtencionSeleccionado = '';
    this.modalidadSeleccionado = '';
    this.duracionServicioSeleccionado = '';

    // Resetea los valores de los checkbox
    this.requerimientos.forEach((requerimiento) => {
      requerimiento.selected = false;
    });

    this.canales.forEach((canal) => {
      canal.selected = false;
    });

    this.dias.forEach((dia) => {
      dia.selected = false;
    });
  }

  grabarCotizacion(): void {
    if (!this.validarCampos()) {
      return; // Si hay campos vacíos, no continúa
    }
    if(!this.pagoAnios){
      this.toastr.warning("Debe generar cotización")
      return
    }
    this.HelpdeskCotizacion ={
        tipoServicio : this.nombreAtencion,
        duracion : this.anios,
        usuarios : this.numUsuarios.toString(),
        modalidad : this.nombreServicio,
        costoXAno : this.pagoAnios
    }

    this.helpdeskService.grabarCotizacion(this.HelpdeskCotizacion).subscribe({
      next:(res) => {
        this.toastr.success("Se guardo exitosamente")
        console.log(res);
      }
    })
}

 verCotizacion(): void {
    this.route.navigate(['/listar-helpdesk'])

 }

}
