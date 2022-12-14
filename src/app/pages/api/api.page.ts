import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.page.html',
  styleUrls: ['./api.page.scss'],
})
export class ApiPage implements OnInit {

  users: any;

  constructor(private menuController: MenuController,
              private apiService: ApiService,
              private navController: NavController,
              private alertController: AlertController) { }

  ngOnInit() {
    this.apiService.getTopComments().subscribe(resp => {
      console.log('users', resp);
      this.users = resp;
    })
  }

  async salir(){
    this.Despedida();
    localStorage.removeItem('ingresado');
    this.navController.navigateRoot('inicio2')
  }





  //método que muestra un mensaje con botón Ok
  async Despedida() {
    const alert = await this.alertController.create({
      header: 'Hasta Luego!',
      message: 'Ha cerrado exitosamente la sesión',
      buttons: ['OK'],
    });

    await alert.present();
  }

  mostrarMenu()
  {
    this.menuController.open('first');
  }
  

}
