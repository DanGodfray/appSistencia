import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumoApiService } from './consumo-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private authenticated = false; // seteamos la variable authenticated en false por defecto
  private userProfile: any = null;

  constructor(
    private apiService: ConsumoApiService, 
    private router: Router
  ) { }

  isLoggednIn() { // creamos un método que nos devuelva el valor de la variable authenticated para saber si el usuario está logueado o no, metodo utilizado por el guard
    return this.authenticated;
  }
  
  login1() { // creamos un método para loguear al usuario cambiando el valor de la variable authenticated a true
    this.authenticated = true;
  }

  getUserProfile() { // creamos un método para obtener el perfil del usuario logueado 
    return this.userProfile;
  }

  login(user: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.apiService.getPostLogin(user, password).subscribe(
        (response) => {
          if (response) {
            this.authenticated = true;
            this.userProfile = response; // Guardamos el perfil del usuario
            resolve(true);
          } else {
            this.authenticated = false;
            reject(false);
          }
        },
        (error) => {
          this.authenticated = false;
          reject(false);
        }
      );
    });
  }

  logout() { // creamos un método para desloguear al usuario cambiando el valor de la variable authenticated a false  
    this.authenticated = false;
    this.userProfile = null;
    this.router.navigate(['/login']); // redireccionamos al usuario a la pagina de login
  }
}
