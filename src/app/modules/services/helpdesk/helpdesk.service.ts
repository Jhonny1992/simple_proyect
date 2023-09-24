import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TipoAtencion} from "../../../model/helpdesk/TipoAtencion";
import {environment} from "../../../../environments/environment";
import {Requerimientos} from "../../../model/helpdesk/Requerimientos";
import {Canales} from "../../../model/helpdesk/Canales";
import {Dias} from "../../../model/helpdesk/Dias";

@Injectable({
  providedIn: 'root'
})
export class HelpdeskService {


  private url2 = 'assets/json/helpdesk/tipo-atencion.json'


  private url: string = `${environment.HOST}`

  constructor(private http: HttpClient) {
  }

  listTipoAtencion(): Observable<TipoAtencion[]> {
    return this.http.get<TipoAtencion[]>(`${this.url}/servicios`);
  }

  listRequerimientos(): Observable<Requerimientos[]> {
    return this.http.get<Requerimientos[]>(`${this.url}/requerimientos`);
  }

  listCanales(): Observable<Canales[]> {
    return this.http.get<Canales[]>(`${this.url}/canales`)
  }

  listTipoServicio(): Observable<Canales[]> {
    return this.http.get<Canales[]>(`${this.url}/modalidades`)
  }

  listDias(): Observable<Dias[]> {
    return this.http.get<Dias[]>(`${this.url}/dias`)
  }
}
