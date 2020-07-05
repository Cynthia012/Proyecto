import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams   } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  urlapi: string = 'https://us-central1-thefeeuaa.cloudfunctions.net/app/';
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

  getAllPosts(){
  
    return this.http.post(this.urlapi + 'getAllPosts',{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
editPost(post:any,newValue):any{
return new Promise((resolve,reject) => {
  
    this.getPosts(post.categoria).subscribe((data) => {
      
      for(let i in data['posts']){
        if(data['posts'][i]['mensaje'] === post['mensaje'] && data['posts'][i]['autor'] === post['autor']){
          const body = new HttpParams()
          .set('idPost', post.postId)
          .set('categoria', post.categoria)
          .set('text', newValue)
          .set('fecha', new Date().toDateString())
          .set('idAutor', post.id)
          .set('nameAutor', post.autor)
          .set('idPost2', data['posts'][i]['idPost']);
          let req = this.http.post(this.urlapi + 'editPost', body.toString(), {
            headers: new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
          });
          resolve({request: req});
           
        }
      }
    });

  });
    
  }
  deletePost(post:any):any{
    return new Promise((resolve,reject) => {
  
      this.getPosts(post.categoria).subscribe((data) => {
        
        for(let i in data['posts']){
          if(data['posts'][i]['mensaje'] === post['mensaje'] && data['posts'][i]['autor'] === post['autor']){
            const body = new HttpParams()
            .set('idPost', post.postId)
            .set('categoria', post.categoria)                     
            .set('idPost2', data['posts'][i]['idPost'])
            .set('idAutor', post.id);
            let req = this.http.post(this.urlapi + 'deletePost', body.toString(), {
              headers: new HttpHeaders()
              .set('Content-Type', 'application/x-www-form-urlencoded')
            });
            resolve({request: req});
             
          }
        }
      });
  
    });
  }
}
