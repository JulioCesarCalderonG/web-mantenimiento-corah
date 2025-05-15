import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { pathUrl } from '../api/apiMantenimiento';
import { HttpClient } from '@angular/common/http';
import { Login } from '../interface/login.interface';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {
  url=`${pathUrl}/usuario`;
  private platformId = inject(PLATFORM_ID);
  constructor(private http:HttpClient) { }

  postLogin(data:Login):Observable<any>{
    return this.http.post(this.url,data);
  }
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('token');
    }
    return null;
  }
}
