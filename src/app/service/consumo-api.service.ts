import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry,catchError } from 'rxjs/operators';

// se debe installar flask-cors previamente para el servidor flask de api python
//pip install -U flask-cors

@Injectable({
  providedIn: 'root'
})
export class ConsumoApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  //apiUrlEj = 'https://jsonplaceholder.typicode.com'; // definimos la url de la api de jsonplaceholder
  apiUrl = 'http://127.0.0.1:5000/'; // definimos la url de la api en python con flask

  constructor(private http:HttpClient) { }

  /** 
  getPosts():Observable<any>{ // creamos un método que nos devuelva los posts de la api de jsonplaceholder
    return this.http.get(this.apiUrlEj+'/profesores').pipe(
      retry(3)
    );
  }
  */

  getPostProfesores():Observable<any>{ // creamos un método que nos devuelva los posts de la api de profesores y alumnos
    return this.http.get(this.apiUrl+'/profesores').pipe(
      retry(3)
    );
  }

  getPostsCursos(id:number):Observable<any>{ // creamos un método que nos devuelva los posts de la api de profesores y alumnos
    return this.http.get(this.apiUrl+'/profesores/'+id+'/cursos').pipe(
      retry(3)
    );
  }

  getPostsAlumnos(id:number):Observable<any>{ // creamos un método que nos devuelva los posts de la api de profesores y alumnos
    return this.http.get(this.apiUrl+'/profesores/'+id+'/cursos').pipe(
      retry(3)
    );
  }

}
