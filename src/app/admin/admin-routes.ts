import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { adminGuard } from '../guard/admin.guard';
import { SolicitudServicioComponent } from './procesos/solicitud-servicio/solicitud-servicio.component';
import { HojaServicioComponent } from './procesos/hoja-servicio/hoja-servicio.component';
import { reportesRoutes } from './reportes/reporte-routes';
import { tableroRoutes } from './tablero-control/tablero-routes';
import { mantenimientoRoutes } from './mantenimiento/mantenimiento-routes';
import { procesoRoutes } from './procesos/procesos-routes';


export const adminRoutes: Routes = [
    {
        path: 'admin',
        component: LayoutComponent,
        children: [
            ...tableroRoutes,
            ...mantenimientoRoutes,
            ...procesoRoutes,
            ...reportesRoutes,
            { path: '', redirectTo: 'tablero-control/panel-control', pathMatch: 'full' }
        ],
        canActivateChild: [adminGuard]
    },
];

