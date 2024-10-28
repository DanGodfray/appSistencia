import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ConsumoApiService } from 'src/app/service/consumo-api.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {

  message = ""; //Variable para mostrar mensajes
  //tituloAsigDoc = "" //Variable para guardar el titulo de la asignatura seleccionada
  idCurso = 0; //Variable para guardar el id del curso seleccionado
  nombreAsigDoc = ""; //Variable para guardar el nombre de la asignatura seleccionada
  codigoAsigDoc = ""; //Variable para guardar el codigo de la asignatura seleccionada
  seccionAsigDoc = ""; //Variable para guardar la seccion de la asignatura seleccionada

  //objAlumnos: string[] = []; //Variable para guardar los alumnos converidos en objetos
  cursosApi : any[] = []; 

  alumnos : any[] = [];

  constructor(private consumoApi: ConsumoApiService ,private activeroute: ActivatedRoute, private router: Router) { 

    this.activeroute.queryParams.subscribe(params => { //Se recibe la asignatura seleccionada de la pagina anterior

      this.idCurso = this.router.getCurrentNavigation()?.extras.state?.['idCur'];
      console.log("id curso: "+this.router.getCurrentNavigation()?.extras.state?.['idCur']);

      this.nombreAsigDoc = this.router.getCurrentNavigation()?.extras.state?.['nomAsig'];
      console.log("nombre de la asignatura: "+this.router.getCurrentNavigation()?.extras.state?.['nomAsig']);

      this.codigoAsigDoc = this.router.getCurrentNavigation()?.extras.state?.['codAsig'];
      console.log("codigo de la asignatura: "+this.router.getCurrentNavigation()?.extras.state?.['codAsig']);

      this.seccionAsigDoc = this.router.getCurrentNavigation()?.extras.state?.['seccAsig'];
      console.log("seccion de la asignatura: "+this.router.getCurrentNavigation()?.extras.state?.['seccAsig']);

    });   

  }

  ngOnInit() {
    this.mostrarDatosAlumnos();
    this.mostrarDatosAsignatura();
    
  }

  mostrarDatosAsignatura(){

    this.activeroute.queryParams.subscribe(params => { //Se recibe la asignatura seleccionada de la pagina anterior

      this.nombreAsigDoc = this.router.getCurrentNavigation()?.extras.state?.['nomAsig'];
      
      console.log("Nombre de asignatura ruteada: " + this.router.getCurrentNavigation()?.extras.state?.['nomAsig']);

    });   
  }

  mostrarDatosAlumnos(){
    
    this.idCurso = this.router.getCurrentNavigation()?.extras.state?.['idCur']; //Se recibe la asignatura seleccionada de la pagina anterior

    this.consumoApi.getPostsAlumnosCurso(1,this.idCurso).subscribe((resonse) => {  //Se obtienen los datos de la api de los alumnos del curso(idCurso) seleccionado por el profesor (idProf)

      this.alumnos = resonse;
      console.log(resonse);

    },(error) => { //En caso de error
      console.error(error); //Se muestra el error en la consola
      this.message = "Error al obtener los datos de la api"; //Se muestra un mensaje
    });
  }

  goBackPerfilDocente(){

    this.router.navigate(['docente']); //Se envia la asignatura seleccionada a la siguiente pagina
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
