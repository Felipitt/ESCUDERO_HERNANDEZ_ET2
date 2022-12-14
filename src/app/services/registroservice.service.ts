import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


export interface Usuarios{
  nomUsuario: string;
  correoUsuario:string;
  passUsuario:string;
  repassUsuario: string;
  genPasajero: string;
  sedePasajero: string;
  numero: string;
  inicio: string;
  destino: string;
  metodo: string;
 
}

const USERS_KEY = 'my-pasajeros';

@Injectable({
  providedIn: 'root'
})
export class RegistroserviceService {
  private _storage: Storage;

  constructor(private storage: Storage,
              private http: HttpClient) {
    this.init();
   }

   //creamos el storage de Usuarios
   async init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  //creamos un Usuario
  async addUsuarios(dato: Usuarios):Promise<any>{
   return this.storage.get(USERS_KEY).then((datos: Usuarios[])=>{ 
     if(datos){
       datos.push(dato);    //agregamos un objeto al storage
       return this.storage.set(USERS_KEY,datos);
     }
     else{
       return this.storage.set(USERS_KEY, [dato]);
     }
   })
  }//findelmetodo

  //obtener todos los objetos desde el storage 
  async getUsuarios():Promise<Usuarios[]>{
    return this.storage.get(USERS_KEY);
  }


}



