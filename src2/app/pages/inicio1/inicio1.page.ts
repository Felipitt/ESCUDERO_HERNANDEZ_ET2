import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Inicio2Page } from '../inicio2/inicio2.page';



@Component({
  selector: 'app-inicio1',
  templateUrl: './inicio1.page.html',
  styleUrls: ['./inicio1.page.scss'],
})
export class Inicio1Page implements OnInit {
  storage: any;


  constructor(private menuController: MenuController,
              private alertController: AlertController,
              private navController: NavController) { }

  ngOnInit() {
  }

  mostrarMenu(){
    this.menuController.open('first');
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

  async salir(){
    this.Despedida();
    localStorage.removeItem('ingresado');
    this.navController.navigateRoot('inicio2')
  }

 
 



  
}
