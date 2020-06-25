import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { Route } from '@angular/compiler/src/core';


@Injectable({
  providedIn: 'root'
})
export class GuardiaGuard implements CanActivate {

  constructor( private log:LoginComponent,  private router:Router){}
 
 canActivate(){
   let t="hola";
   if(t==="hola")
   {
     return true;
   }else
   this.router.navigate(['/login']);
  {

  }
}
    
}