import { Injectable } from '@angular/core';
import { pathUrl } from '../api/apiMantenimiento';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormReporteDiario } from '../interface/form.reporte.diario.interface';

@Injectable({
  providedIn: 'root'
})
export class ReporteTrabajoDiarioService {
  url = `${pathUrl}/reportediario`
  constructor(private http:HttpClient) { }
  getListadoReporte(data:FormReporteDiario):Observable<any>{
    return this.http.post(this.url,data)
  }
}
