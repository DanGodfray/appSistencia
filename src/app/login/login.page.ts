import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationExtras, ActivatedRoute } from '@angular/router' ;
import { RouterModule } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthserviceService } from '../service/authservice.service';
import { LoadingController } from '@ionic/angular';
import { ConsumoApiService } from '../service/consumo-api.service';
//import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userData : any[] = []; //Variable para guardar los datos del usuario

  constructor(
    private consumoApi: ConsumoApiService ,
    private authService:AuthserviceService,
    private router: Router, 
    private alertController: AlertController
  ) { }

  usuario = new FormGroup({ //Variable para guardar los datos del usuario en un formulario reactivo (formGroup) con sus respectivas validaciones
    user: new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(20)]),
    pass: new FormControl('',[Validators.required, Validators.minLength(4),Validators.maxLength(20)]),
  }); //Variable para guardar los datos del usuario

  ngOnInit() { //Aqui se cargaran los datos cuando se carga la pagina por primera vez
  }

  navegar(){ //Funcion para navegar a la pagina home
    //this.router.navigate(['/home']);
    let navigationExtras: NavigationExtras = {
      state: {user: this.usuario}
      };
      this.router.navigate(['/alumno'],navigationExtras); //se envia el formulario con los datos del usuario a la pagina de alumno
  }

  async navegarExtras(){ //Funcion para navegar a la pagina perfil alumno con datos a traspasar a la pagina destino (alumno)

    /** 
    //Se envia el formulario con los datos del usuario a la pagina de alumno enduro
    let setData: NavigationExtras = { //Variable para enviar datos a otra pagina
  
     state: { //Estructura de los datos a enviar
  
      id: this.usuario.value.user, // se debe reemplazar por el id real del usuario logueado
      user: this.usuario.value.user, // formControlName: 'pass'
      pass: this.usuario.value.pass // formControlName: 'pass'
  
     }
  
    };

    
    try{

      
      if(this.usuario.value.user?.includes('@alumno.cl') && this.usuario.value.pass == 'alumno'){
        //this.router.navigate(['/admin'],setData);
  
        
        this.authService.login(); //Se loguea al usuario alumno
        this.router.navigate(['/alumno'],setData);
  
      }else if(this.usuario.value.user?.includes('@docente.cl') && this.usuario.value.pass == 'docente'){
        //this.router.navigate(['/admin'],setData); //Se envia a la pagina de admin
  
        this.authService.login(); //Se loguea al usuario dccente
        this.router.navigate(['/docente'],setData);
      }else{
  
        this.presentAlert("Usuario Invalido","Ingrese un correo o contraseña valida",""); //Se muestra un mensaje de alerta con el titulo, subtitulo y mensaje como parametro de entrada
      }

    }catch(error:any){
      console.log("Error al navegar a la pagina de perfil");
      this.presentAlert("Error de login","",""); 
    }
    //fin de la navegacion a la pagina de perfil
    */
    
    const user = this.usuario.value.user ?? '';
    const pass = this.usuario.value.pass ?? '';

    try {
      // Llama a la función de login de AuthserviceService
      const isAuthenticated = await this.authService.login(user, pass);

      if (isAuthenticated) {
        const userProfile = this.authService.getUserProfile();
        let navigationExtras: NavigationExtras = {
          //state: { ...userProfile }

          state: { 
            id: userProfile.id,
            user: userProfile.user,
            password: pass, // Agrega el password recibido
            nombre: userProfile.nombre,
            perfil: userProfile.tipoPerfil, // Verifica que perfil se envía correctamente
            correo: userProfile.correo
          }
        };

        // Redirige según el perfil recibido de la API
        if (userProfile.tipoPerfil >= 1) {
          this.router.navigate(['/docente'], navigationExtras);
        } else if (userProfile.tipoPerfil === 0) {
          this.router.navigate(['/alumno'], navigationExtras);
        }
      }
    } catch (error) {
      // Muestra el mensaje de error si no se pudo autenticar
      await this.presentAlert("Error de autenticación", "Credenciales incorrectas", "Verifique su usuario y contraseña.");
    }

   }

   async presentAlert(titulo: string,subTit: string, mensj: string) { //Funcion para mostrar un mensaje de alerta
    
    console.log("debug alert user: " +this.usuario.value.user);
    console.log("debug alert pass: " +this.usuario.value.pass);

    const alert = await this.alertController.create({ // estructura para mostrar un mensaje de alerta
      header: titulo,
      subHeader: subTit,
      message: mensj,
      buttons: ['Aceptar'],
    });

    await alert.present(); //Se muestra el mensaje de alerta
  }
  


}
