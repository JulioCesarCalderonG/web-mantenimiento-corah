import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RTrabajoDiarioComponent } from './r-trabajo-diario/r-trabajo-diario.component';
import { LayoutComponent } from '../layout/layout.component';
import { adminGuard } from '../guard/admin.guard';
import { AnexoMantenimientoComponent } from './anexo-mantenimiento/anexo-mantenimiento.component';


export const adminRoutes: Routes = [
    { 
        path: 'admin', 
        component: LayoutComponent,
        children:[
            {path:'panel-control',component:DashboardComponent},
            {path:'tipos-de-bienes',component:RTrabajoDiarioComponent},
            {path:'grupos',component:RTrabajoDiarioComponent},
            {path:'plan-mantenimiento',component:RTrabajoDiarioComponent},
            {path:'bienes-mantto',component:RTrabajoDiarioComponent},
            {path:'solicitud-servicio',component:RTrabajoDiarioComponent},
            {path:'hoja-de-servicio',component:RTrabajoDiarioComponent},
            {path:'incidencias',component:RTrabajoDiarioComponent},
            {path:'operatividad',component:RTrabajoDiarioComponent},
            {path:'ocurrencias',component:RTrabajoDiarioComponent},
            {path:'actividades',component:RTrabajoDiarioComponent},
            {path:'alertas',component:RTrabajoDiarioComponent},
            {path:'trabajos-diarios',component:RTrabajoDiarioComponent},
            {path:'anexo-mantenimiento',component:AnexoMantenimientoComponent},
            { path: '', redirectTo: 'panel-control', pathMatch: 'full' }
        ],
        canActivateChild:[adminGuard]
    },
];

