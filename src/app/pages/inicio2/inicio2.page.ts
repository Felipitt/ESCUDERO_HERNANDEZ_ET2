import { Component, ErrorHandler, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { RegistroserviceService, Usuarios } from '../../services/registroservice.service';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-inicio2',
  templateUrl: './inicio2.page.html',
  styleUrls: ['./inicio2.page.scss'],
})
export class Inicio2Page implements OnInit {

  formularioLogin: FormGroup;
  usuarios : Usuarios[] = [];

  constructor(private alertController: AlertController, 
              private navController: NavController,
              private registroService: RegistroserviceService,
              private toastController: ToastController, 
              private fb: FormBuilder) { 
                this.formularioLogin = this.fb.group({ 
                  'nombre' : new FormControl ("", Validators.required),
                  'correo' : new FormControl("", Validators.required),
                  'password' : new FormControl ("", Validators.required)
                  
                              
                })
              }

  ngOnInit() {
  }

  async Ingresar(){
    var f = this.formularioLogin.value;
    var a=0;
    this.registroService.getUsuarios().then(datos=>{ 
      this.usuarios = datos; 
      if (!datos || datos.length==0){
        return null;
      }
      for (let obj of this.usuarios){
        if (f.correo == obj.correoUsuario && f.password==obj.passUsuario && f.nombre == obj.nomUsuario){
          a=1;
          this.bienvenida();
          console.log('ingresado');
          localStorage.setItem('ingresado','true');
          this.navController.navigateRoot('inicio1');
          this.showToast('Bienvenido a TaxyTravel: ' +obj.nomUsuario);
        }
      }//findelfor
      if(a==0){
        this.alertMsg();
      }
    });
  }//findelmetodo

  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    })
    await toast.present();
  }
  
  


  async bienvenida() {
    const alert = await this.alertController.create({
      
      message: 'Ha ingresado correctamente',
      buttons: ['OK'],
    });

    await alert.present();
  }


  async alertMsg(){
    const alert = await this.alertController.create({
      header: 'Error...',
      message: 'Los datos ingresados son incorrectos',
      buttons: ['Aceptar']
    
    });
    await alert.present();
    return;
  }

  

}
