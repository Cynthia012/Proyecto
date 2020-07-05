import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  urlapi = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }
  
  sendMessage(id: string, mensaje: string,fecha: string, origen: string) {
    const body = new HttpParams()
    .set('uid', id)
    .set('origen', origen)
    .set('fecha', fecha)
    .set('mensaje',mensaje);

    return this.http.post(this.urlapi + 'sendMessage', body.toString(), {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  getMessages(usuario: string) {
    const body = new HttpParams()
    .set('uid', usuario);

    return this.http.post(this.urlapi + 'getMessages', body.toString(), {
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
}
