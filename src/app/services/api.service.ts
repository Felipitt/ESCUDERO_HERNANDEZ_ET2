import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }
  getTopComments(){
    return this.httpClient.get('https://jsonplaceholder.typicode.com/users');
  }



}
