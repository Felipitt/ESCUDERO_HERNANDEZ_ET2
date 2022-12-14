import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ViajesPage } from '../viajes/viajes.page';
import { AlertController } from '@ionic/angular';
import { RegistroserviceService, Usuarios } from '../../services/registroservice.service';
import { ToastController } from '@ionic/angular';
import {
  FormGroup, FormControl, Validators, FormBuilder
} from '@angular/forms'



@Component({
  selector: 'app-ingreso-p',
  templateUrl: './ingreso-p.page.html',
  styleUrls: ['./ingreso-p.page.scss'],
})
export class IngresoPPage implements OnInit {

  formularioDatos2: FormGroup; 
  newUsuario: Usuarios = <Usuarios>{};


 
   
  constructor(private menuController: MenuController,
              private loadingCtrl: LoadingController,
              private alertController: AlertController,
              private navController: NavController,
              private registroService: RegistroserviceService,
              private toastController: ToastController,
              private fb: FormBuilder) {
                this.formularioDatos2 = this.fb.group({
                  'nombre' : new FormControl("", Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(10),
                  ])),
                  'numero' : new FormControl("", Validators.compose([
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(8),
                  ])),
                  'inicio': new FormControl("", Validators.required), 
                  'destino': new FormControl("", Validators.required),
                  'metodo': new FormControl("", Validators.required),
                  
                })
               }

  ngOnInit() {
  }

  mostrarMenu(){
    this.menuController.open('first');
  }

  async CrearInfo(){
    var form = this.formularioDatos2.value;
    if (this.formularioDatos2.invalid){
      this.alertError();
    }
    else{
    this.newUsuario.nomUsuario=form.nombre;
    this.newUsuario.numero=form.numero;
    this.newUsuario.inicio=form.inicio;
    this.newUsuario.destino=form.destino;
    this.newUsuario.metodo=form.metodo;
    this.registroService.addUsuarios(this.newUsuario).then(dato=>{ 
      this.newUsuario=<Usuarios>{};
      this.navController.navigateRoot('lista');
      this.showToast('Informacion Guardada!');
    });
    this.formularioDatos2.reset();
  }
  }//findelmetodo
  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    })
    await toast.present();
  }


  async alertError(){
    const alert = await this.alertController.create({ 
      header: 'Error..',
      message: 'Debe completar todos los datos',
      buttons: ['Aceptar']
    })
    await alert.present();
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

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Buscando Conductores...',
      duration: 3000,
    });

    loading.present();
  }

  async auto() {
    const alert = await this.alertController.create({
      message: 'No se encontraron conductores',
      buttons: ['Inténtelo nuevamente'],
    });

    await alert.present();
  }



}
