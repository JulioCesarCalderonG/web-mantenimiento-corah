import { Component, computed, Input, OnInit, signal } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Menu, MenuResult } from '../../interface/menu.interface';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MenuItemComponent } from "../menu-item/menu-item.component";

export type MenuIntem = {
  icon: string;
  label: string;
  route?: string;
  subItem?: MenuIntem[];
};

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MenuItemComponent
],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  sidenavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sidenavCollapsed.set(val);
  }
  idMenu: number = 13;
  listMenu: Menu[] = [];
  menuItems = signal<MenuIntem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'panel-control',
    },
    {
      icon: 'dashboard',
      label: 'Mantenimiento',
      route: 'tipos-de-bienes',
    },
    {
      icon: 'dashboard',
      label: 'Grupos',
      route: 'grupos',
    },
    {
      icon: 'dashboard',
      label: 'Reportes',
      route: 'reportes',
      subItem: [
        {
          icon: 'dashboard',
          label: 'Incidencias',
          route: 'incidencias',
        },
        {
          icon: 'dashboard',
          label: 'Operatividad',
          route: 'operatividad',
        },
        {
          icon: 'dashboard',
          label: 'Ocurrencias',
          route: 'ocurrencias',
        },
        {
          icon: 'dashboard',
          label: 'Actividades',
          route: 'actividades',
        }
      ],
    },
  ]);

  profilePicSize = computed(() => (this.sidenavCollapsed() ? '32' : '100'));
  constructor(private menuSer: MenuService) {}
  ngOnInit(): void {
    //this.obtenerListadoMenu();
  }

  mostrarMenu() {
    this.menuSer.getMenu(this.idMenu).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  obtenerListadoMenu() {
    this.menuSer.getListadoMenu().subscribe({
      next: (data: MenuResult) => {
        console.log(data);
        this.listMenu = data.menu;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
