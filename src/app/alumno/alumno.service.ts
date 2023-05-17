import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const baseUrl = 'http://localhost:7790/alumno';
@Injectable({
  providedIn: 'root'
})

export class AlumnoService {
  constructor(private http: HttpClient) {
  }

  getAllAlumnos(): Observable<any> {
    return this.http.get(baseUrl + '/listAll/');
  }

  newAlumno(data: any): Observable<any> {
    return this.http.post( baseUrl + '/new/', data);
  }

  updateAlumno(id: number, data: any): Observable<any> {
    return this.http.put( baseUrl + '/update/' + id + '/', data);
  }

  deleteAlumno(id: number): Observable<any> {
    return this.http.delete( baseUrl + '/delete/' + id + '/');
  }
}
