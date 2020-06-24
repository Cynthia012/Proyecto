import { QuejaComponent } from './queja/queja.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  { path: 'theFee', component: PrincipalComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'quejarse_aqui', component: QuejaComponent},
  {path: '', pathMatch: 'full', redirectTo: 'theFee'},
  { path: '**', redirectTo: 'theFee' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
