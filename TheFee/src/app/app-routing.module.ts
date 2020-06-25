import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriasComponent } from './categorias/categorias.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { Categoria1Component } from './categoria1/categoria1.component';
import { GuardiaGuard } from '../app/guards/guardia.guard';
import { from } from 'rxjs';
import { AdminComponent } from './admin/admin.component';
import { QuejaComponent } from './queja/queja.component';
import { FullscreenOverlayContainer } from '@angular/cdk/overlay';

const routes: Routes = [

  { path: 'theFee', component: PrincipalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'categoria1/:id', component: Categoria1Component },
  { path: 'admin', component: AdminComponent },
  { path: 'quejarse_aqui', component: QuejaComponent },
  { path: '**', redirectTo: 'theFee' },
  { path: ' ', pathMatch: 'full', redirectTo: 'theFee' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
