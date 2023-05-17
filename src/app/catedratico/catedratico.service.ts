import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const baseUrl = 'http://localhost:7790/catedratico';
@Injectable({
  providedIn: 'root'
})

export class CatedraticoService {
  constructor(private http: HttpClient) {
  }

  getAllCatedraticos(): Observable<any> {
    return this.http.get(baseUrl + '/listAll/');
  }

  newCatedratico(data: any): Observable<any> {
    return this.http.post( baseUrl + '/new/', data);
  }

  updateCatedratico(id: number, data: any): Observable<any> {
    return this.http.put( baseUrl + '/update/' + id + '/', data);
  }

  deleteCatedratico(id: number): Observable<any> {
    return this.http.delete( baseUrl + '/delete/' + id + '/');
  }
}
