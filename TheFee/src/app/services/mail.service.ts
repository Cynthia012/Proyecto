import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  urlapi = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }

  sendMail(usuario: string, queja: string) {
    const body = new HttpParams()
    .set('user', usuario)
    .set('queja', queja);
    return this.http.post(this.urlapi + 'sendMail', body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  getQuejas() {
    const body = new HttpParams()
    return this.http.post(this.urlapi + 'getQuejas', body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  delteQuejas() {
    const body = new HttpParams()
    return this.http.post(this.urlapi + 'deleteQuejas', body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
}
