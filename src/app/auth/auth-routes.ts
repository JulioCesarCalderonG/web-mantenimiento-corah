import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';


export const authRoutes: Routes = [
    { 
        path: 'auth', 
        component: AuthComponent,
        children:[
            {path:'admin', component:AdminComponent},
            {path:'registrar', component:RegisterComponent},
            { path: '', redirectTo: 'admin', pathMatch: 'full' }
        ] 
    },
];
