import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authRoutes } from './auth/auth-routes';
import { adminRoutes } from './admin/admin-routes';
import { homeRoutes } from './home/home-routes';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    ...homeRoutes,
    ...authRoutes,
    ...adminRoutes,
    { path: '**', redirectTo: '' }
];
