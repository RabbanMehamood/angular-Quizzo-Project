import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly _http: HttpClient) {}

  loginUser$(value): Observable<any> {
    return this._http.post('http://localhost:8080/users', value);
  }

  loginAdmin$(value: object) {
    return this._http.post('https://api.example.com/users', {
      userName: 'rabban',
      password: '12344556',
    });
  }
}
