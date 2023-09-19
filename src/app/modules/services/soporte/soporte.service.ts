import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TipoAtencion} from "../../../model/helpdesk/TipoAtencion";
import {Servicio} from "../../../model/soporte/Servicio";
import {HorarioAtencion} from "../../../model/soporte/HorarioAtencion";
import {Actividades} from "../../../model/soporte/Actividades";
import {TipoEquipos} from "../../../model/soporte/TipoEquipos";

@Injectable({
  providedIn: 'root'
})
export class SoporteService {

  private url: string = `${environment.HOST}/soporte`

  constructor(private http: HttpClient) { }


  listTipoServicio(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.url}/modalidad`);
  }

  listHorarioAtencion(): Observable<HorarioAtencion[]> {
    return this.http.get<HorarioAtencion[]>(`${this.url}/office`);
  }

  listActividades(): Observable<Actividades[]> {
    return this.http.get<Actividades[]>(`${this.url}/otros`);
  }

  listTipoEquipos(): Observable<TipoEquipos[]> {
    return this.http.get<TipoEquipos[]>(`${this.url}/hardware`);
  }

}
