import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { InicioComponent } from './inicio/inicio.component';
import { ContactoComponent } from './contacto/contacto.component';


export const homeRoutes: Routes = [
    { 
        path: '', 
        component: HomeComponent,
        children:[
            {path:'',component:InicioComponent},
            {path:'contacto',component:ContactoComponent}
        ]
    },
];
