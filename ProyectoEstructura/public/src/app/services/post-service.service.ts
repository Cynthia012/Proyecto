import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams   } from '@angular/common/http';
import * as firebase from 'firebase/app';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  urlapi: string = 'http://localhost:5001/thefeeuaa/us-central1/app/';
  private $subirPost: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  // tslint:disable-next-line: variable-name
  _subirPost: Observable<any> = this.$subirPost.asObservable();

  constructor(private http: HttpClient,private afCS: AngularFireStorage) { }

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

  sendPost(user, fileData, descripcion: string, categoria: string, fecha: string) {
    // Create the file metadata
    const metadata = {
      contentType: 'image/jpeg'
    };
    const imgRef = this.afCS.storage.ref(`imagenesPublicadas/${user.uid}/${fileData.name}`);
    const uploadTask = imgRef.put(fileData, metadata);

    // Listen for state changes, errors, and completion of the upload.
    return uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            break;
        }
      }, (error: any) => {
        return ({ succes: false, error });
      }, () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log(`se subio ${fecha}`)
            const nombreFoto = 'imagenesPostsPrincipales' + user.uid + fileData.name;
            const body = new HttpParams()
              .set('uid', user.uid)
              .set('mensaje', descripcion)
              .set('urlImagen', downloadURL)
              .set('nombreFoto', nombreFoto)
              .set('autor',user.displayName)
              .set('categoria', categoria)
              .set('fecha',fecha);
            this.http.post(this.urlapi + 'addPostWithImage', body.toString(), {
              headers: new HttpHeaders()
                .set('Content-Type', 'application/x-www-form-urlencoded')
            }).subscribe((data) => {
              this.$subirPost.next(data);
            });
        });
      });
  }

  getPosts(categoria: string) {
    console.log(categoria)
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
