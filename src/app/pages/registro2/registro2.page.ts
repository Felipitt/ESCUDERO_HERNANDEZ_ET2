import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RegistroserviceService, Usuarios } from '../../services/registroservice.service';
import { ToastController, NavController} from '@ionic/angular';
import { 
  FormControl, FormBuilder, FormGroup, Validators 
} from '@angular/forms';

@Component({
  selector: 'app-registro2',
  templateUrl: './registro2.page.html',
  styleUrls: ['./registro2.page.scss'],
})
export class Registro2Page implements OnInit {

  formularioRegistro2: FormGroup; 
  newUsuario: Usuarios = <Usuarios>{};
  usuarios: Usuarios[] =[];

  constructor(private alertController: AlertController,
              private registroService: RegistroserviceService,
              private toastController: ToastController,
              private navController: NavController,
              private fb: FormBuilder) {
                this.formularioRegistro2 = this.fb.group({
                  'nombre' : new FormControl("", Validators.compose([
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(10),
                  ])), 
                  'correo' : new FormControl("", [Validators.required, Validators.email]), 
                  'password': new FormControl("", Validators.compose([
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(8),
                  ])), 
                  'confirmaPass': new FormControl("", Validators.compose([
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(8),
                  ])),
                  'genero': new FormControl("", Validators.required),
                  'sede': new FormControl("", Validators.required)
                })
               }
               

  ngOnInit() {
  }


  async CrearUsuario(){
    var form = this.formularioRegistro2.value;
    var existe = 0;

    if (this.formularioRegistro2.invalid){
      this.alertError();
    }
    else{
    this.newUsuario.nomUsuario=form.nombre;
    this.newUsuario.correoUsuario=form.correo;
    this.newUsuario.passUsuario = form.password;
    this.newUsuario.repassUsuario=form.confirmaPass;
    this.newUsuario.genPasajero=form.genero;
    this.newUsuario.sedePasajero=form.sede;
    
    this.registroService.getUsuarios().then(datos=>{
    this.usuarios = datos;

    if (!datos || datos.length==0){
      this.registroService.addUsuarios(this.newUsuario).then(dato=>{ 
        this.newUsuario=<Usuarios>{};
        this.showToast('Usuario Creado!');
    });
    this.formularioRegistro2.reset();
    this.navController.navigateRoot('inicio2')
    }else{

    for (let obj of this.usuarios){
      if (this.newUsuario.correoUsuario == obj.correoUsuario){
        existe = 1;
      }
    }
  //findelmetodo
  if (existe == 1){
    this.alertCorreoDuplicado();
    this.formularioRegistro2.reset();
  }
  else{
    this.registroService.addUsuarios(this.newUsuario).then(dato=>{ 
      this.newUsuario=<Usuarios>{};
      this.showToast('Usuario Creado satisfactoriamente');
    });
    this.formularioRegistro2.reset();
    this.navController.navigateRoot('inicio2');
  }
}
}) 
}//finelse 

}//findelmetodo


  async alertError(){
    const alert = await this.alertController.create({ 
      header: 'Error..',
      message: 'Debe completar todos los datos',
      buttons: ['Aceptar']
    })
    await alert.present();
  }

  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    })
    await toast.present();
  }

  async alertCorreoDuplicado(){
    const alert = await this.alertController.create({ 
      header: '¡Error!',
      message: 'El correo ingresado ya existe',
      buttons: ['Aceptar']
    })
    await alert.present();
  }

}