import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Ubicacion } from '../app/models/ubicacion'


@Injectable({
  providedIn: 'root'
})
export class UbicacionService {


      ubicacionlist: AngularFireList<any>;
      selectedUbicacion:Ubicacion=new Ubicacion()

  constructor(private firebase :AngularFireDatabase) {}
        
  
  getUbicacion(){
    return    this.ubicacionlist= this.firebase.list('Ubicaciones')
  }
  
  insertUbicacion(ubicacion:Ubicacion){

        this.ubicacionlist.push({
          usuario:ubicacion.usuario,
          latitud:ubicacion.latitud,
          longitud:ubicacion.longitud
        });
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