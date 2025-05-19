import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TableroControlComponent } from './tablero-control.component';
import { DashboardComponent } from './dashboard/dashboard.component';



export const tableroRoutes: Routes = [{
    path:'tablero-control',
    component:TableroControlComponent,
    children:[
        {path:'panel-control',component:DashboardComponent}
    ]
}
];
