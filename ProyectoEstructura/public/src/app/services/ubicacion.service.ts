import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { Ubicacion } from '../models/ubicacion';


@Injectable({
  providedIn: 'root'
})
export class UbicacionService {


  ubicacionlist: AngularFireList<any>;
  selectedUbicacion:Ubicacion=new Ubicacion()

constructor(private firebase :AngularFireDatabase) {
  AngularFireModule.initializeApp(environment.firebase);
}
    

getUbicacion(){
  
return  this.ubicacionlist= this.firebase.list('Ubicaciones')
}

insertUbicacion(ubicacion:Ubicacion){
 


  this.ubicacionlist.push({
      usuario:ubicacion.usuario,
      latitud:ubicacion.latitud,
      longitud:ubicacion.longitud
    });
    
  AngularFireModule.initializeApp(environment.firebaseConfig);


}

  updateUbicacion(ubicacion:Ubicacion){
      this.ubicacionlist.update(ubicacion.$key,{
        usuario:ubicacion.usuario,
        latitud:ubicacion.latitud,
        longitud:ubicacion.longitud
      });

  }


  delteUbicacion($key:string){
      this.ubicacionlist.remove($key)
  }


}
