import { environment} from '../environments/environment';
import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { from } from 'rxjs';
import { Ubicacion } from 'src/app/models/ubicacion';
import {UbicacionService } from '../app/services/ubicacion.service'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  baseUrl="http://localhost:3000/";
  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;
  style = `mapbox://styles/mapbox/satellite-v9`;
  lat = 43.1746;
  lng = -2.4125;
  zoom = 15;

  long: String; 
  lati: String; 
  user: String;
  key: String;
  constructor(private ubicacionService: UbicacionService, private http: HttpClient) { 
    this.long = ubicacionService.selectedUbicacion.longitud;
    this.lati = ubicacionService.selectedUbicacion.latitud;
    this.user = ubicacionService.selectedUbicacion.usuario;
    this.key = ubicacionService.selectedUbicacion.$key;
    // Asignamos el token desde las variables de entorno
    this.mapbox.accessToken = environment.mapBoxToken;
  }


  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  sendUbication(lat:string, long:string, usuario:string){
    let body= new HttpParams()
    .set("user", usuario)
    .set("lat", lat)
    .set("long", long)
    return this.http.post(this.baseUrl+"sendUbication",body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type','application/x-www-form-urlencoded')
    });
  }
/*
  resetForm(ubicacionform?: NgForm){
      if (ubicacionform != null){
        ubicacionform.reset();
        this.ubicacionService.selectedUbicacion=new Ubicacion
      }*/

}
