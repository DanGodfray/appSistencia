import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConsumoApiService } from 'src/app/service/consumo-api.service';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
})
export class DocentePage implements OnInit {

  message = "";
  nombreAsig = ""; //Variable para almacenar el nombre de la asignatura seleccionada por el docente en la api 
  codigoAsig = "";
  seccionAsig = "";

  cursosApi : any[] = []; //Variable para almacenar los cursos del profesor

  user = "";
  pass = "";

  constructor(private consumoApi:ConsumoApiService ,private activeroute: ActivatedRoute, private router: Router) { 

    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.user = this.router.getCurrentNavigation()?.extras.state?.['id'];
        this.pass = this.router.getCurrentNavigation()?.extras.state?.['user'];
        console.log("id: "+ this.router.getCurrentNavigation()?.extras.state?.['id']);
        console.log("user: "+ this.router.getCurrentNavigation()?.extras.state?.['user']);
        console.log("pass: "+ this.router.getCurrentNavigation()?.extras.state?.['pass']);
      }
      
  
    });
  }

  ngOnInit() {
    //this.mosrarDatosApi(); //Se llama a la funcion para mostrar los datos de la api

    this.getPostCursosProfesor(); //Se llama a la funcion para obtener los cursos del profesor
  }

  getPostCursosProfesor() { //Funcion para obtener los cursos del profesor

    this.consumoApi.getPostCursosProfesor(1).subscribe((response)=>{
      console.log("esto es un ejemplo de getPostCursosProfesor "+response);

      this.cursosApi = response;
      
    }); //Se retorna los cursos del profesor
  }

  mosrarDatosApi(){ //Funcion para mostrar los datos de la api

    this.consumoApi.getPostCursosProfesor(1).subscribe((res) => { //Se obtienen los datos de la api
      this.message =' '+ res[0]; //Se muestra un mensaje
      console.log("Los objetos de la api son: "+res); //Se muestran los datos en la consola
      console.log("Los objetos de la api son nombre asignatura: "+res.nombre); //Se muestran los datos en la consola

      for (let i = 0; i < res.length; i++) {
        console.log("Nombre de la asignatura "+ [i+1] +": " + res[i].nombre);
        //this.nombreAsig = res[i].nombre;
      }

      //debbuging de pruebas

      console.log("Nombre de la asignatura a rellenar: " + res[0].nombre);
      this.nombreAsig = res[0].nombre;

      console.log("Codigo de la asignatura a rellenar: " + res[0].codigo);
      this.codigoAsig = res[0].codigo;

      console.log("Seccion de la asignatura a rellenar: " + res[0].seccion);
      this.seccionAsig = res[0].seccion;

      //fin del debbugin de pruebas


    },(error) => { //En caso de error
      console.error(error); //Se muestra el error en la consola
      this.message = "Error al obtener los datos de la api"; //Se muestra un mensaje
    });

  }

  nextPageListado(nombreAsignaturaSeleccionada: string, codigoAsignaturaSeleccionada: string, seccionAsignatura: string,idCursoSeleccionado: number){

    let setData: NavigationExtras = { //Se envia la asignatura seleccionada a la siguiente pagina
      state: {
        nomAsig: nombreAsignaturaSeleccionada, //Se envia la asignatura seleccionada por id(asig) del html
        codAsig: codigoAsignaturaSeleccionada,
        seccAsig: seccionAsignatura,
   
         //alum: this.alumnos, //Se envia el arreglo de alumnos
        idCur: idCursoSeleccionado, //Se envia el arreglo de alumnos
        
      }
   
     };

    this.router.navigate(['docente/listado'],setData);
  }

  nextPageQR(nombreAsignaturaSeleccionada: string, codigoAsignaturaSeleccionada: string, seccionAsignatura: string,idCursoSeleccionado: number){

    let setData: NavigationExtras = { //Se envia la asignatura seleccionada a la siguiente pagina
      state: {
        nomAsig: nombreAsignaturaSeleccionada, //Se envia la asignatura seleccionada por id(asig) del html
        codAsig: codigoAsignaturaSeleccionada,
        seccAsig: seccionAsignatura,
        idCur: idCursoSeleccionado, //Se envia el arreglo de alumnos
        
      }
   
     };

    this.router.navigate(['docente/qr-asignatura'],setData); //Se envia la asignatura seleccionada a la siguiente pagina
  }

}
