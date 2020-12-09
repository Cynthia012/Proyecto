import { environment} from '../environments/environment';
import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { from } from 'rxjs';

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
  constructor() {
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
    console.log("holaaa"+ lat+ " "+ long +" "+ usuario);

  }

}
