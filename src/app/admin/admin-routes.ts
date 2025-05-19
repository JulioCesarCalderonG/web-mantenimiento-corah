import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from '../layout/layout.component';
import { adminGuard } from '../guard/admin.guard';
import { TipoBienesComponent } from './tipo-bienes/tipo-bienes.component';
import { GruposComponent } from './grupos/grupos.component';
import { PlanMantenimientoComponent } from './plan-mantenimiento/plan-mantenimiento.component';
import { BienesMantenimientoComponent } from './bienes-mantenimiento/bienes-mantenimiento.component';
import { SolicitudServicioComponent } from './solicitud-servicio/solicitud-servicio.component';
import { HojaServicioComponent } from './hoja-servicio/hoja-servicio.component';
import { reportesRoutes } from './reportes/reporte-routes';


export const adminRoutes: Routes = [
    { 
        path: 'admin', 
        component: LayoutComponent,
        children:[
            {path:'panel-control',component:DashboardComponent},
            {path:'tipos-de-bienes',component:TipoBienesComponent},
            {path:'grupos',component:GruposComponent},
            {path:'plan-mantenimiento',component:PlanMantenimientoComponent},
            {path:'bienes-mantto',component:BienesMantenimientoComponent},
            {path:'solicitud-servicio',component:SolicitudServicioComponent},
            {path:'hoja-de-servicio',component:HojaServicioComponent},
            ...reportesRoutes,
            { path: '', redirectTo: 'panel-control', pathMatch: 'full' }
        ],
        //canActivateChild:[adminGuard]
    },
];

