import { Component, computed, Inject, OnInit, PLATFORM_ID, Renderer2, signal } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderComponent, 
    RouterModule, 
    FooterComponent,
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
 ngOnInit(): void {
   
 }

}
