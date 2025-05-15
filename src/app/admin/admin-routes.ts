import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RTrabajoDiarioComponent } from './r-trabajo-diario/r-trabajo-diario.component';
import { LayoutComponent } from '../layout/layout.component';
import { adminGuard } from '../guard/admin.guard';


export const adminRoutes: Routes = [
    { 
        path: 'admin', 
        component: LayoutComponent,
        children:[
            {path:'panel-control',component:DashboardComponent},
            {path:'tipos-bienes',component:RTrabajoDiarioComponent},
            {path:'grupos',component:RTrabajoDiarioComponent},
            {path:'plan-mantenimiento',component:RTrabajoDiarioComponent},
            {path:'bienes-mantenimiento',component:RTrabajoDiarioComponent},
            {path:'solicitud-servicio',component:RTrabajoDiarioComponent},
            {path:'hoja-servicio',component:RTrabajoDiarioComponent},
            {path:'reporte-incidencias',component:RTrabajoDiarioComponent},
            {path:'reporte-operatividad',component:RTrabajoDiarioComponent},
            {path:'reporte-ocurrencia',component:RTrabajoDiarioComponent},
            {path:'reporte-actividades',component:RTrabajoDiarioComponent},
            {path:'reporte-alertas',component:RTrabajoDiarioComponent},
            {path:'reporte-trabajo-diario',component:RTrabajoDiarioComponent},
            { path: '', redirectTo: 'panel-control', pathMatch: 'full' }
        ],
        canActivateChild:[adminGuard]
    },
];

