import { Component } from '@angular/core';


interface Componente{
  icon:string;
  name:string;
  redirecTo:string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}


  componentes : Componente[] = [
    {
      icon: 'radio-button-on-outline',
      name: 'Home',
      redirecTo: '/inicio1'
      
    },
    {

      icon: 'person-circle-outline',
      name: 'Inicio Sesión',
      redirecTo: '/inicio2'
    },
    {

      icon: 'finger-print',
      name: 'Conductor',
      redirecTo: '/ingreso-c'
    },
    {
      icon: 'images-outline',
      name: 'Sobre Nosotros',
      redirecTo: '/nosotros'

    }



  ];

}
