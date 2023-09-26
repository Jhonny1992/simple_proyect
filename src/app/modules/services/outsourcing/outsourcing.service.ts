import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {TipoAtencion} from "../../../model/helpdesk/TipoAtencion";
import {ServicioOutSourcing} from "../../../model/outsourcing/ServicioOutSourcing";
import {SubServicio} from "../../../model/outsourcing/SubServicio";
import {SubServiceByService} from "../../../model/outsourcing/SubServiceByService";

@Injectable({
  providedIn: 'root'
})
export class OutsourcingService {

  private url: string = `${environment.HOST}`

  constructor(private http: HttpClient) {
  }

  listservicios(): Observable<ServicioOutSourcing[]> {
    return this.http.get<ServicioOutSourcing[]>(`${this.url}/service-outsourcing`);
  }

  listSubServicesByService(codigo: number | undefined): Observable<SubServicio[]> {
    if (codigo === undefined || codigo === null || !codigo) {
      return of([]);
    }
    return this.http.get<SubServicio[]>(`${this.url}/sub-service-outsourcing/${codigo}?fields=subServicioOutSourcings`)

  }

  grabarCotizacionOutsourcing(jsonCotizacion: any): Observable<any> {
    return this.http.post<any>(`${this.url}/outsourcing/grabar`,jsonCotizacion)
  }

  listarCotizacionOutsourcing(): Observable<any>{
    return this.http.get<any>(`${this.url}/outsourcing/listar`)
  }

}
