import { Component, inject, OnInit } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthAdminService } from '../../../services/auth-admin.service';
@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [CommonModule,NgxExtendedPdfViewerModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

   pdfUrl?: string;

  private http = inject(HttpClient);
  constructor(private router:Router, private authServ:AuthAdminService){

  }

  ngOnInit() {
    this.http
      .get(
        'https://backendmuni.gongalsoft.com/api/politicaprivacidad/poderjudicial',
        { responseType: 'blob' }
      )
      .subscribe({
        next: blob => {
          const url = URL.createObjectURL(blob);
          this.pdfUrl = url;
        },
        error: err => {
          console.error('Error al obtener el PDF:', err);
        }
      });
  }
  cerrar(){
    //this.authServ.logout();
    //this.router.navigate(['/auth/admin']);
    this.authServ.logout();
  }
}
