import { Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { adminGuard } from '../guard/admin.guard';
import { reportesRoutes } from './reportes/reporte-routes';
import { tableroRoutes } from './tablero-control/tablero-routes';
import { mantenimientoRoutes } from './mantenimiento/mantenimiento-routes';
import { procesoRoutes } from './procesos/procesos-routes';
import { InicioComponent } from './inicio/inicio.component';


export const adminRoutes: Routes = [
    {
        path: 'admin',
        component: LayoutComponent,
        children: [
            {path:'',component:InicioComponent},
            ...tableroRoutes,
            ...mantenimientoRoutes,
            ...procesoRoutes,
            ...reportesRoutes,
            { path: '', redirectTo: '', pathMatch: 'full' }
        ],
        canActivateChild: [adminGuard]
    },
];

