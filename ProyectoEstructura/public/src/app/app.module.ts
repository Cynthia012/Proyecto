import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UsuarioComponent } from './usuario/usuario.component';
import {  HttpClientModule,HttpClient, HttpHeaders } from "@angular/common/http";
import{ GuardiaGuard } from '../app/guards/guardia.guard';
//angular
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Categoria1Component } from './categoria1/categoria1.component';
// import {FormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { AuthService } from './auth.service';
import { AdminComponent } from './admin/admin.component';
import { QuejaComponent } from './queja/queja.component';
import { GetlogComponent } from './getlog/getlog.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { QrComponent } from './qr/qr.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    LoginComponent,
    RegisterComponent,
    CategoriasComponent,
    NavbarComponent,
    UsuarioComponent,
    Categoria1Component,
    AdminComponent,
    QuejaComponent,
    GetlogComponent,
    QrComponent
  ],
  imports: [
    // FormsModule,
    NgxQRCodeModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    
  ],
  providers: [AuthService, LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
