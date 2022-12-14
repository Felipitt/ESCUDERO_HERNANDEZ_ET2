import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ConductoresService } from 'src/app/services/conductores.service';


@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {
  @ViewChild('map')mapRef: ElementRef;
  map: GoogleMap;
  conductores = []




  constructor(private menuController: MenuController,
              private alertController: AlertController,
              private navController: NavController,
              private conductorService: ConductoresService){}

  ionViewDidEnter(){
    this.createMap();

  }

  async createMap(){
    this.map = await GoogleMap.create({
      id: 'my-map',
      apiKey: environment.mapsKey,
      element: this.mapRef.nativeElement,
      config: {
        center: {
          lat: -33.447487,
          lng: -70.673676,
        },
        zoom: 8,
      },

    });

    this.addMarkers();
  }

  async addMarkers(){
    const markers: Marker[] = [
      {
        coordinate: {
          lat: -33.510881 ,
          lng:  -70.752941 ,
        },
        title: 'Duoc Sede',
        
      },
      {
        coordinate: {
          lat: -33.553873 ,
          lng:  -70.795707 ,
        },
        title: 'Ciudad Satelite',
        
      },
    ];

    const result = await this.map.addMarkers(markers);

    this.map.setOnMarkerClickListener(async (marker) => {
      console.log(marker);
    });
  }



  





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
  async pago() {
    const alert = await this.alertController.create({
      header: 'Debe cancelar $2000 al Conductor',
      message: 'Muchas Gracias!',
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

