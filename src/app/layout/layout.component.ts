import { Component, Inject, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderComponent, 
    RouterModule, 
    FooterComponent,
    CommonModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  url = 'assets/vendor/jquery/jquery.min.js'; // Usa ruta absoluta
  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log("Cargando script jQuery...");
      this.loadScript("assets/vendor/jquery/jquery.min.js");
      this.loadScript("assets/vendor/bootstrap/js/bootstrap.bundle.min.js");
      this.loadScript("assets/vendor/jquery-easing/jquery.easing.min.js");
      this.loadScript("assets/js/sb-admin-2.min.js");
    }
  }

  public loadScript(url2:string) {
    let node = this.renderer.createElement('script');
    node.src = url2;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';

    // Añadir un evento 'load' para cuando el script se cargue
    node.onload = () => {
      console.log("jQuery cargado correctamente.");
    };

    // Añadir un evento 'error' en caso de fallo de carga
    node.onerror = (error:any) => {
      console.error("Error al cargar el script: ", error);
    };

    this.renderer.appendChild(document.head, node); // Usar Renderer2
  }
}
