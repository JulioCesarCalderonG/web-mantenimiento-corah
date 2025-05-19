import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProcesosComponent } from './procesos.component';
import { SolicitudServicioComponent } from './solicitud-servicio/solicitud-servicio.component';
import { HojaServicioComponent } from './hoja-servicio/hoja-servicio.component';



export const procesoRoutes: Routes = [
    {
        path: 'procesos',
        component: ProcesosComponent,
        children: [
            { path: 'solicitud-servicio', component: SolicitudServicioComponent },
            { path: 'hoja-de-servicio', component: HojaServicioComponent },
        ]
    },
];
