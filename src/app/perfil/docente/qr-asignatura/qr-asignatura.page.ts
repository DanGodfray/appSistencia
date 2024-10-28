import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import {formatDate} from '@angular/common';
import { ConsumoApiService } from 'src/app/service/consumo-api.service';


@Component({
  selector: 'app-qr-asignatura',
  templateUrl: './qr-asignatura.page.html',
  styleUrls: ['./qr-asignatura.page.scss'],
})
export class QrAsignaturaPage implements OnInit {

  idCurso = 0; //Variable para guardar el id del curso seleccionado
  nombreAsigDoc = ""; //Variable para guardar el nombre de la asignatura seleccionada
  codigoAsigDoc = ""; //Variable para guardar el codigo de la asignatura seleccionada
  seccionAsigDoc = ""; //Variable para guardar la seccion de la asignatura seleccionada

  qrCodeString = "" //Variable para guardar el texto del codigo QR
  //se debe instalar posteriormente: npm i angularx-qrcode

  cursosApi : any[] = [];

  fechaHoy = formatDate(new Date(), 'dd/MM/yyyy', 'en')

  constructor(private consumoApi: ConsumoApiService ,private activeroute: ActivatedRoute, private router: Router) { 

    this.idCurso = this.router.getCurrentNavigation()?.extras.state?.['idCur'];
    console.log("id curso: "+this.router.getCurrentNavigation()?.extras.state?.['idCur']);

    this.nombreAsigDoc = this.router.getCurrentNavigation()?.extras.state?.['nomAsig'];
    console.log("nombre de la asignatura: "+this.router.getCurrentNavigation()?.extras.state?.['nomAsig']);

    this.codigoAsigDoc = this.router.getCurrentNavigation()?.extras.state?.['codAsig'];
    console.log("codigo de la asignatura: "+this.router.getCurrentNavigation()?.extras.state?.['codAsig']);

    this.seccionAsigDoc = this.router.getCurrentNavigation()?.extras.state?.['seccAsig'];
    console.log("seccion de la asignatura: "+this.router.getCurrentNavigation()?.extras.state?.['seccAsig']);  

  }

  ngOnInit() {
    this.mostrarQR();
    this.getPostCursosProfesor();
  }

  

  getPostCursosProfesor() { //Funcion para obtener los cursos del profesor

    this.consumoApi.getPostCursosProfesor(1).subscribe((response)=>{
      console.log("esto es un ejemplo de getPostCursosProfesor "+response);

      this.cursosApi = response;
      
    }); //Se retorna los cursos del profesor
  }

  mostrarQR(){
    this.activeroute.queryParams.subscribe(params => { //Se recibe la asignatura seleccionada de la pagina anterior

      console.log(this.router.getCurrentNavigation()?.extras.state?.['idCur']);
      //console.log(this.router.getCurrentNavigation()?.extras.state?.['qrCodeString']);

      this.qrCodeString = this.idCurso+" "+this.nombreAsigDoc + " " + this.codigoAsigDoc +" "+ this.seccionAsigDoc +" "+ this.fechaHoy; //Se crea el texto del codigo QR incluye la fecha actual
      
      console.log(this.qrCodeString); //Se imprime el arreglo de alumnos

      
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

  goBackListado(nombreAsignaturaSeleccionada: string, codigoAsignaturaSeleccionada: string, seccionAsignatura: string,idCursoSeleccionado: number){

    let setData: NavigationExtras = { //Se envia la asignatura seleccionada a la siguiente pagina
      state: {
        nomAsig: nombreAsignaturaSeleccionada, //Se envia la asignatura seleccionada por id(asig) del html
        codAsig: codigoAsignaturaSeleccionada,
        seccAsig: seccionAsignatura,
   
         //alum: this.alumnos, //Se envia el arreglo de alumnos
        idCur: idCursoSeleccionado, //Se envia el arreglo de alumnos
        

      }
   
     };

    if (this.router.url.includes('docente/listado'), setData) {
      this.router.navigate(['docente'],setData);
      
    }
    //this.router.navigate(['docente/listado'],setData);
  }

}
