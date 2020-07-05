import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetlogService {
  server = 'http://localhost:3000';
  constructor(private http: HttpClient) {
      

   }


  adminMatch(id){
      return this.http.post(this.server + '/getAdmin?id=' + id, {title: 'adminRequest'});
  }
}
