import { Routes } from '@angular/router';
import { AccueilComponent } from './Composant/Auth/accueil/accueil.component';
import { AuthComponent } from './Composant/Auth/public/auth.component';
import { DashbordComponent } from './Composant/Dashbord/dashbord/dashbord.component';
import { ContenuComponent } from './Composant/Dashbord/contenu/contenu.component';
import { ListEleveComponent } from './Composant/Eleve/list-eleve/list-eleve.component';
import { AddUpdateEleveComponent } from './Composant/Eleve/add-update-eleve/add-update-eleve.component';
import { ListEvaluationComponent } from './Composant/Evaluation/list-evaluation/list-evaluation.component';
import { AddUpdateEvaluationComponent } from './Composant/Evaluation/add-update-evaluation/add-update-evaluation.component';
import { ListMatiereComponent } from './Composant/Matiere/list-matiere/list-matiere.component';
import { AddUpdateMatiereComponent } from './Composant/Matiere/add-update-matiere/add-update-matiere.component';
import { ListUesComponent } from './Composant/Ues/list-ues/list-ues.component';
import { AddUpdateUesComponent } from './Composant/Ues/add-update-ues/add-update-ues.component';
import { EleveComponent } from './Composant/Eleve/eleve/eleve.component';
import { EvaluationComponent } from './Composant/Evaluation/evaluation/evaluation.component';
import { MatiereComponent } from './Composant/Matiere/matiere/matiere.component';
import { UesComponent } from './Composant/Ues/ues/ues.component';



export const routes: Routes = [

  {path:'auth',component:AuthComponent},
  {path:'',component:AccueilComponent},
  {
    path:'',
    component:DashbordComponent,
    children:[
 {path:'',redirectTo:'Dashbord-Accueil', pathMatch:'full'},
 {path:'Dashbord-Accueil',component:ContenuComponent},
 {path:'Dashbord-eleves',component:EleveComponent,
 children: [
  {path: '', redirectTo: 'liste', pathMatch: 'full'},
  {path: 'liste', component: ListEleveComponent},
  {path: 'add-update', component: AddUpdateEleveComponent},
  {path: 'add-update/:id', component: AddUpdateEleveComponent},
    ]
  },
  {path:'Dashbord-evaluations',component:EvaluationComponent,
    children: [
     {path: '', redirectTo: 'liste', pathMatch: 'full'},
     {path: 'liste', component: ListEvaluationComponent},
     {path: 'add-update', component: AddUpdateEvaluationComponent},
     {path: 'add-update/:id', component: AddUpdateEvaluationComponent},
       ]
     },
     {path:'Dashbord-matieres',component:MatiereComponent,
      children: [
       {path: '', redirectTo: 'liste', pathMatch: 'full'},
       {path: 'liste', component: ListMatiereComponent},
       {path: 'add-update', component: AddUpdateMatiereComponent},
       {path: 'add-update/:id', component: AddUpdateMatiereComponent},
         ]
       },
       {path:'Dashbord-ues',component:UesComponent,
        children: [
         {path: '', redirectTo: 'liste', pathMatch: 'full'},
         {path: 'liste', component: ListUesComponent},
         {path: 'add-update', component: AddUpdateUesComponent},
         {path: 'add-update/:id', component: AddUpdateUesComponent},
           ]
         },
]
},

];
