import { Component, NgZone, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import * as mapboxgl from 'mapbox-gl';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  user: firebase.User;
  constructor(private route : ActivatedRoute,
    private router: Router,
    private afAuth: AngularFireAuth,
    private ngZone: NgZone,
    private map: MapService) {
this.afAuth.onAuthStateChanged((user) => {
this.ngZone.run(() => {
if (!user) {
this.router.navigate(['theFee']);
}else{
  this.user=user;
}
});
});
    }


  ngOnInit(): void {
    this.map.buildMap();
  }

goto(): void{
  if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => { 
        this.map.map.setCenter([position.coords.longitude,position.coords.latitude]);
        let marker = new mapboxgl.Marker()
        .setLngLat([position.coords.longitude,position.coords.latitude])
        .addTo(this.map.map);
      });
  } else { /* geolocation IS NOT available, handle it */ }
 }
 
save(): void{
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => { 
      this.map.sendUbication(position.coords.latitude.toString(), position.coords.longitude.toString(),this.user.displayName).subscribe(res =>{
        if(res=="OK"){
          Swal.fire(
            'Ubicación registrada con éxito',
            '',
            'success'
          )
        }
      });
    });
} else { /* geolocation IS NOT available, handle it */ }
  
 }

 mostrar(): void{
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => { 
      this.map.getUbication(position.coords.latitude.toString(), position.coords.longitude.toString()).subscribe(res =>{
        console.log(res);
        for(let el in res){
          var popup = new mapboxgl.Popup()
          .setText(res[el]['usuario'])
          .addTo(this.map.map);

          this.map.map.setCenter([position.coords.longitude,position.coords.latitude]);
          let marker = new mapboxgl.Marker()
          .setPopup(popup)
          .setLngLat([res[el]['longitud'],res[el]['latitud']])
          .addTo(this.map.map)
           
        }
      });
    });
} else { /* geolocation IS NOT available, handle it */ }
  
 }

}


