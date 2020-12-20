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
      this.map.sendUbication(position.coords.latitude.toString(), position.coords.longitude.toString(),this.user.displayName,this.user.photoURL).subscribe(res =>{
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
          console.log("https://firebasestorage.googleapis.com/v0/b/thefeeuaa.appspot.com/o/fotoDePerfil%2FHF0MPwqIHudQkZ8cvw9Oy5PUfkD3%2F2doPersonajeDefinitivo.jpg?alt=media&token=78ecbad4-d49f-4c42-abb6-d1aa0ae69ce9".length);
          var popup = new mapboxgl.Popup()
          
          //.setText(res[el]['usuario'])
          //<img src="https://firebasestorage.googleapis.com/v0/b/thefeeuaa.appspot.com/o/fotoDePerfil%2FHF0MPwqIHudQkZ8cvw9Oy5PUfkD3%2F2doPersonajeDefinitivo.jpg?alt=media&token=78ecbad4-d49f-4c42-abb6-d1aa0ae69ce9" alt="" />
          .setHTML(`
          <h6>${res[el]['usuario']}</h6>
          <img style="width:6em;height:6em;border-radius:200px" src="${res[el]['imagen']}" alt="" />`)
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


