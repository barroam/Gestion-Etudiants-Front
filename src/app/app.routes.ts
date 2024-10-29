import { Routes } from '@angular/router';

import { AccueilComponent } from './Composant/Auth/accueil/accueil.component';
import { AuthComponent } from './Composant/Auth/public/auth.component';



export const routes: Routes = [

  {path:'auth',component:AuthComponent},
  {path:'',component:AccueilComponent}
];
