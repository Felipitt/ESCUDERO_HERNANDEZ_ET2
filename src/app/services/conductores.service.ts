import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iconductores } from '../interfaces/iconductores';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConductoresService {

  constructor(private http: HttpClient) { }

  lista():Observable<Iconductores>{
    return this.http.get<Iconductores>(`${environment.apiURL}/conductores`)
  }
}
