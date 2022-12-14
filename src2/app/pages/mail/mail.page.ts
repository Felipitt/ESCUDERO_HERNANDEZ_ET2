import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { RegistroserviceService, Usuario } from '../../services/registroservice.service';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.page.html',
  styleUrls: ['./mail.page.scss'],
})
export class MailPage implements OnInit {

  formularioCorreo: FormGroup;
  usuarios : Usuario[] = [];

  constructor(private menuController: MenuController,
              private alertController: AlertController,
              private navController: NavController,
              private registroService: RegistroserviceService, 
              private fb: FormBuilder) { 
                this.formularioCorreo = this.fb.group({ 
                  'correo' : new FormControl("", Validators.required),
                  
                  
                              
                })
              }

  ngOnInit() {
  }

  mostrarMenu(){
    this.menuController.open('first');
  }

  async Enviar(){
    var f = this.formularioCorreo.value;
    var a=0;
    this.registroService.getUsuarios().then(datos=>{ 
      this.usuarios = datos; 
      if (!datos || datos.length==0){
        return null;
      }
      for (let obj of this.usuarios){
        if (f.correo == obj.correoUsuario){
          a=1;
          this.recuperar();
          console.log('enviado');
          localStorage.setItem('enviado','true');
          this.navController.navigateRoot('inicio2');
        }
      }//findelfor
      if(a==0){
        this.alertMsg();
      }
    });
  }//findelmetodo


  //método que muestra un mensaje con botón Ok
  async recuperar() {
    const alert = await this.alertController.create({
      header: 'Correo enviado!',
      message: 'Recibira un correo de confirmación',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async alertMsg(){
    const alert = await this.alertController.create({
      header: 'Error...',
      message: 'Correo no valido',
      buttons: ['Aceptar']
    
    });
    await alert.present();
    return;
  }

}
