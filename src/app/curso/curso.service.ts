import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const baseUrl = 'http://localhost:7790/curso';
@Injectable({
  providedIn: 'root'
})

export class CursoService {
  constructor(private http: HttpClient) {
  }

  getAllCursos(): Observable<any> {
    return this.http.get(baseUrl + '/listAll/');
  }

  newCurso(data: any): Observable<any> {
    return this.http.post( baseUrl + '/new/', data);
  }

  updateCurso(id: number, data: any): Observable<any> {
    return this.http.put( baseUrl + '/update/' + id + '/', data);
  }

  deleteCurso(id: number): Observable<any> {
    return this.http.delete( baseUrl + '/delete/' + id + '/');
  }
}
