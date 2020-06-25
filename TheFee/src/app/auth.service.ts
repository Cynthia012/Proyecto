import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams   } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserInterface } from "../app/models/user-interface";


import { isNullOrUndefined } from "util";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class AuthService {

  urlapi: string = 'http://localhost:3000/';
  private $user: BehaviorSubject<any> = new BehaviorSubject<any>(null);//igual a nulo
  _user: Observable<any> = this.$user.asObservable(); //_person sera un observable de un solo objeto
  aux: any;
  constructor(private http: HttpClient, private afAuth: AngularFireAuth) {
    this.afAuth.onAuthStateChanged((user) => {
      this.aux = user;
    });
  }

  addUserBD(uid: any, nombre: string, foto: string, fecha: string) {
    console.log(`${uid} ${nombre} ${foto} ${fecha}`);

    const body = new HttpParams()
    .set('nombre', nombre)
    .set('uid', uid)
    .set('foto', foto)
    .set('fecha', fecha);

    return this.http.post(this.urlapi + 'addUser', body.toString(), {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  updateUser(){
    this.afAuth.currentUser.then((user) => {this.aux = user; });
    this.$user.next(this.aux);
    //console.log(this.aux);
  }

  getUser(): any {
    return this.aux;
  }

}
