import { Component, computed, OnInit, signal } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import { AuthAdminService } from '../services/auth-admin.service';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    SidebarComponent,
    RouterModule,
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule
    
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  collapsed=signal(false);
  sidenavWidth=computed(()=>this.collapsed()?'65px':'250px')


  constructor(private authServ:AuthAdminService, private router:Router) {
    
  }
 ngOnInit(): void {
   
 }
 cerrar(){
  this.authServ.logout();
  this.router.navigate(['/auth/admin']);
 }

}
