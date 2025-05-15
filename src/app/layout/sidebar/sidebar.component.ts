import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-sidebar',
  standalone:true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  idMenu:number=13;
  constructor(
    private menuSer:MenuService
  ) {
    
  }
  ngOnInit(): void {
    this.mostrarMenu();
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
  
}
