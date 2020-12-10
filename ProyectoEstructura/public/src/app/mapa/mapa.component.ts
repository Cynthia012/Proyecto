import { Component, NgZone, OnInit } from '@angular/core';
import { MapService } from '../map.service';
import * as mapboxgl from 'mapbox-gl';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


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
      this.map.saveUbication(position.coords.latitude.toString(), position.coords.longitude.toString(),this.user.uid);
    });
} else { /* geolocation IS NOT available, handle it */ }
  
 }
 

}


