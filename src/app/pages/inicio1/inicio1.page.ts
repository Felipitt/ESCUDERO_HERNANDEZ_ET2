import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { RegistroserviceService, Usuarios } from '../../services/registroservice.service';





@Component({
  selector: 'app-inicio1',
  templateUrl: './inicio1.page.html',
  styleUrls: ['./inicio1.page.scss'],
})
export class Inicio1Page implements OnInit {

  usuarios : Usuarios[] = [];
  newUsuario: Usuarios = <Usuarios>{};

  constructor(private menuController: MenuController,
              private alertController: AlertController,
              private navController: NavController,
              private registroService: RegistroserviceService,
              private plt: Platform) { 
                this.plt.ready().then(()=>{
                  this.loadUsuarios();
                })

                
              }

  ngOnInit() {
  }

  mostrarMenu(){
    this.menuController.open('first');
  }

  //invocamos al método getDatos() del servicio
  loadUsuarios(){
    this.registroService.getUsuarios().then(usuarios=>{ 
      this.usuarios = usuarios;
    })
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
