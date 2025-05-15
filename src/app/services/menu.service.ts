import { Injectable } from '@angular/core';
import { pathUrl } from '../api/apiMantenimiento';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  url = `${pathUrl}/menu`
  constructor(private http:HttpClient) { }

  getMenu(id:number):Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }
}
