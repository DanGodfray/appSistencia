import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';



@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  qrCodeString = 'Ejemplo de odigo QR de asistencia'; //Variable para guardar el texto del codigo QR

  scannedResult: any; //Variable para guardar el resultado del escaneo
  //incompleto

  
  constructor(private activeroute: ActivatedRoute, private router: Router) {

    this.activeroute.queryParams.subscribe(params => { //Se obtienen los datos del usuario que se envian desde la pagina de login 
      console.log( this.router.getCurrentNavigation()?.extras.state?.['id']);
      console.log(this.router.getCurrentNavigation()?.extras.state?.['user']);
  
    });
  
  }

  ngOnInit() {
  }

  startScan(){ //Funcion para escanear el codigo QR

    //incompleto
    console.log("Scan");

  }

  nextPageAsignaturas(){ //Funcion para ir a la pagina de asignaturas

    this.router.navigate(['alumno/asignaturas']);
  }

}
