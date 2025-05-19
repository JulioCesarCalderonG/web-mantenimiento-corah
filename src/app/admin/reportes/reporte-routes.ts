import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReportesComponent } from './reportes.component';
import { RIncidenciaComponent } from './r-incidencia/r-incidencia.component';
import { ROperatividadComponent } from './r-operatividad/r-operatividad.component';
import { ROcurrenciaComponent } from './r-ocurrencia/r-ocurrencia.component';
import { RActividadComponent } from './r-actividad/r-actividad.component';
import { RAlertaComponent } from './r-alerta/r-alerta.component';
import { RTrabajoDiarioComponent } from './r-trabajo-diario/r-trabajo-diario.component';
import { AnexoMantenimientoComponent } from './anexo-mantenimiento/anexo-mantenimiento.component';


export const reportesRoutes: Routes = [
    { 
        path: 'reportes', 
        component: ReportesComponent,
        children:[
            {path:'incidencias',component:RIncidenciaComponent},
            {path:'operatividad',component:ROperatividadComponent},
            {path:'ocurrencias',component:ROcurrenciaComponent},
            {path:'actividades',component:RActividadComponent},
            {path:'alertas',component:RAlertaComponent},
            {path:'trabajos-diarios',component:RTrabajoDiarioComponent},
            {path:'anexo-mantenimiento',component:AnexoMantenimientoComponent},
            { path: '', redirectTo: '', pathMatch: 'full' }
        ] 
    },

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];