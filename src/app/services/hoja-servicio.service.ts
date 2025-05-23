import { Injectable } from '@angular/core';
import { pathUrl } from '../api/apiMantenimiento';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormHojaSer } from '../interface/form.hoja.servicio.interface';

@Injectable({
  providedIn: 'root'
})
export class HojaServicioService {
  url = `${pathUrl}/hojaservicio`;

  constructor(private http: HttpClient) { }
  getHojaServicio(data: FormHojaSer): Observable<any> {
    return this.http.get(this.url, {
      params: {
        anio: data.anio,
        mes: data.mes,
        estado: data.estado
      }
    })
  }
  generarReporte(id: number): Observable<Blob> {
    return this.http.get(`${this.url}/reporte/${id}`, {
      responseType: 'blob'
    });
  }
}
