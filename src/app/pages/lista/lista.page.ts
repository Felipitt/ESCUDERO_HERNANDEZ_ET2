import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { ConductoresService } from 'src/app/services/conductores.service';
import { AlertController, MenuController, NavController} from '@ionic/angular';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit{

  conductores = []

  constructor(private conductoresService: ConductoresService,
              private loadCtrl: LoadingController,
              private menuController: MenuController,
              private alertController: AlertController,
              private navController: NavController) { }

  ngOnInit() {
  this.loadConductores();
  }

  

  async loadConductores(event?: InfiniteScrollCustomEvent){
    const loading = await this.loadCtrl.create({
      message : "Cargando..",
      spinner: "bubbles"
    });
    await loading.present();

    this.conductoresService.lista().subscribe(
      (resp)=>{
        loading.dismiss();
        console.log(resp);
        let listString = JSON.stringify(resp)
        this.conductores = JSON.parse(listString)
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
  
    async salir(){
      this.Despedida();
      localStorage.removeItem('ingresado');
      this.navController.navigateRoot('inicio2')
    }
  }


