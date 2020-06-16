import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactoComponent } from './contacto/contacto.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'about',component: AboutComponent},
  {path:'contacto', component:ContactoComponent},
  {path:'preguntas', component:PreguntasComponent},   
  {path:'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
