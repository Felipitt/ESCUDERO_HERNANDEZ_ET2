import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { RegistroserviceService, Usuario } from '../../services/registroservice.service';
import { ToastController } from '@ionic/angular';
import {
  FormGroup, FormControl, Validators, FormBuilder
} from '@angular/forms'

@Component({
  selector: 'app-ingreso-c',
  templateUrl: './ingreso-c.page.html',
  styleUrls: ['./ingreso-c.page.scss'],
})
export class IngresoCPage implements OnInit {

  formularioDatos: FormGroup; 
  newUsuario: Usuario = <Usuario>{};

  constructor(private menuController: MenuController,
              private alertController: AlertController,
              private navController: NavController,
              private registroService: RegistroserviceService,
              private toastController: ToastController,
              private fb: FormBuilder) {
                this.formularioDatos = this.fb.group({
                  'nombre' : new FormControl("", Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(10),
                  ])), 
                  'patente': new FormControl("", Validators.compose([
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(6),
                  ])),
                  'inicio': new FormControl("", Validators.required), 
                  'destino': new FormControl("", Validators.required),
                  'cant': new FormControl("", Validators.required),
                  'dispo': new FormControl("", Validators.required)
                })
               }

  ngOnInit() {
  }

  mostrarMenu(){
    this.menuController.open('first');
  }

  async CrearInfo(){
    var form = this.formularioDatos.value;
    if (this.formularioDatos.invalid){
      this.alertError();
    }
    else{
    this.newUsuario.nomUsuario=form.nombre;
    this.newUsuario.patConductor=form.patente;
    this.newUsuario.inicio=form.inicio;
    this.newUsuario.destino=form.destino;
    this.newUsuario.cant=form.cant;
    this.newUsuario.dispo=form.dispo;
    this.registroService.addUsuario(this.newUsuario).then(dato=>{ 
      this.newUsuario=<Usuario>{};
      this.navController.navigateRoot('lista');
      this.showToast('Informacion Guardada!');

    });
    this.formularioDatos.reset();
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
}




