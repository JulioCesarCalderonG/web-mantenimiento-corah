import { Component, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MenuIntem } from '../sidebar/sidebar.component';
import { animate, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-menu-item',
  imports: [MatListModule, RouterModule,MatIconModule],
  animations:[
    trigger('expandContractMenu',[
      transition(':enter',[
        style({opacity:0,height:'0px'}),
        animate('500ms ease-in-out',style({opacity:1,height:'*'}))
      ]),
      transition(':leave',[
        animate('500ms ease-in-out',style({opacity:0,height:'0px'}))
      ])
    ])
  ],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css'
})
export class MenuItemComponent {
  item=input.required<MenuIntem>();
  collapsed=input(false);
  nestedMenuOpen=signal(false);
  toggleNested(){
    if (!this.item().subItem) {
      return;
    }
    this.nestedMenuOpen.set(!this.nestedMenuOpen());
  }
}
