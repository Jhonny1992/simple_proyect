import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TipoAtencion} from "../../../model/helpdesk/TipoAtencion";

@Injectable({
  providedIn: 'root'
})
export class HelpdeskService {



  private url = 'assets/json/helpdesk/tipo-atencion.json'

  private url2 = 'http://localhost:8090/servicios'

  constructor( private http: HttpClient) { }

  listTipoAtencion():Observable<TipoAtencion[]>{
    return this.http.get<TipoAtencion[]>(this.url2);
  }

}
