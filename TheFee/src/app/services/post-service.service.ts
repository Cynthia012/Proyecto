import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams   } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  urlapi: string = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  addPost(uid: any, autor: string, mensaje: string, categoria: string, fecha: string){
    const body = new HttpParams()
    .set('uid', uid)
    .set('autor', autor )
    .set('mensaje', mensaje)
    .set('categoria', categoria)
    .set('fecha', fecha);

    return this.http.post(this.urlapi + 'addPost', body.toString(), {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  getPosts(categoria: string) {
    const body = new HttpParams()
    .set('categoria', categoria);

    return this.http.post(this.urlapi + 'getPosts', body.toString(), {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  getMyPosts(id: any) {
    const body = new HttpParams()
    .set('uid', id);

    return this.http.post(this.urlapi + 'getMyPosts', body.toString(), {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
}
