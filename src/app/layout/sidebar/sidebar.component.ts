import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Menu, MenuResult } from '../../interface/menu.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  idMenu:number=13;
  listMenu:Menu[]=[];
  constructor(
    private menuSer:MenuService
  ) {
    
  }
  ngOnInit(): void {
    this.obtenerListadoMenu();
  }

  mostrarMenu(){
    this.menuSer.getMenu(this.idMenu).subscribe({
      next:(data)=>{
        console.log(data);
        
      },
      error:error=>{
        console.log(error);
        
      }
    })
  }
  obtenerListadoMenu(){
    this.menuSer.getListadoMenu().subscribe({
      next:(data:MenuResult)=>{
        console.log(data);
        this.listMenu=data.menu;
      },
      error:error=>{
        console.log(error);
      }
    })
  }
}
