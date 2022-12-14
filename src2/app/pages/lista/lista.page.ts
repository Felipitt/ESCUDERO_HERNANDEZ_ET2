import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController} from '@ionic/angular';
import { PasajerosService } from 'src/app/services/pasajeros.service';
import { AlertController, MenuController, NavController} from '@ionic/angular';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  pasajeros =[]

  constructor(private pasajerosService: PasajerosService,
              private loadCtrl: LoadingController,
              private alertController: AlertController,
              private menuController: MenuController,
              private navController: NavController) { }

  ngOnInit() {
    this.loadPasajeros();
  }

  async loadPasajeros(event?: InfiniteScrollCustomEvent){
    const loading = await this.loadCtrl.create({
      message : "cargando..",
      spinner : "bubbles"
    });
    await loading.present();

    this.pasajerosService.lista().subscribe(
      (resp)=>{
        loading.dismiss();
        console.log(resp);
        let listString = JSON.stringify(resp)
        this.pasajeros = JSON.parse(listString)
        event?.target.complete();
      },
      (err)=>{
        console.log(err.message)
        loading.dismiss();
      }
    )
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

  async continuar() {
    const alert = await this.alertController.create({
      header: 'Ha comenzado su viaje!',
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
