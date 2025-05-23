import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { pathUrl } from '../api/apiMantenimiento';
import { HttpClient } from '@angular/common/http';
import { Login } from '../interface/login.interface';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {
  url=`${pathUrl}/usuario`;
  private platformId = inject(PLATFORM_ID);
  constructor(private http:HttpClient, private route:Router) { }

  postLogin(data:Login):Observable<any>{
    return this.http.post(this.url,data);
  }
  getToken(): string | null {
  if (typeof window !== 'undefined' && window.sessionStorage) {
    return sessionStorage.getItem('token');
  }
  return null;
}
  logout(){
    sessionStorage.removeItem('token');
    this.route.navigate(['/auth/admin']);
  }
}
