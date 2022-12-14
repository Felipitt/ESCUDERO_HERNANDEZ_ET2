import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ipasajeros } from '../interfaces/ipasajeros';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasajerosService {

  constructor(private http: HttpClient) { }

  lista():Observable<Ipasajeros>{
    return this.http.get<Ipasajeros>(`${environment.apiURL}/pasajeros`)
  }
}
