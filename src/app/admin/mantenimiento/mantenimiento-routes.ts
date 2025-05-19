import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MantenimientoComponent } from './mantenimiento.component';
import { TipoBienesComponent } from './tipo-bienes/tipo-bienes.component';
import { GruposComponent } from './grupos/grupos.component';
import { PlanMantenimientoComponent } from './plan-mantenimiento/plan-mantenimiento.component';
import { BienesMantenimientoComponent } from './bienes-mantenimiento/bienes-mantenimiento.component';

export const mantenimientoRoutes: Routes = [
  {
    path: 'mantenimiento',
    component: MantenimientoComponent,
    children: [
      { path: 'tipos-de-bienes', component: TipoBienesComponent },
      { path: 'grupos', component: GruposComponent },
      { path: 'plan-mantenimiento', component: PlanMantenimientoComponent },
      { path: 'bienes-mantto', component: BienesMantenimientoComponent },
    ],
  },

  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];
