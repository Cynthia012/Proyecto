import { environment} from '../environments/environment';
import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { from } from 'rxjs';
import { Ubicacion } from 'src/app/models/ubicacion';
import {UbicacionService } from '../app/services/ubicacion.service'

@Injectable({
  providedIn: 'root'
})
export class MapService {

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
  constructor(private ubicacionService: UbicacionService) { 
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

  saveUbication(lat:String, long:String, usuario:String){
    let  objetoUbicacion=new Ubicacion();
    objetoUbicacion.usuario=usuario;
    objetoUbicacion.longitud=long;
    objetoUbicacion.latitud=lat;
      
    console.log("holaaa"+ lat+ " "+ long +" "+ usuario);

///insertar y actualizar
this.ubicacionService.insertUbicacion(objetoUbicacion)
//  this.ubicacionService.updateUbicacion(objetoUbicacion)

//  this.resetForm(ubicacionform);


  }
/*
  resetForm(ubicacionform?: NgForm){
      if (ubicacionform != null){
        ubicacionform.reset();
        this.ubicacionService.selectedUbicacion=new Ubicacion
      }*/

}
