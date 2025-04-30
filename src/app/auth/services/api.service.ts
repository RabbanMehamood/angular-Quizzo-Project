import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly _http: HttpClient) {}

  loginUser$(): Observable<any> {
    return this._http.post('https://api.example.com/users', {
      userName: 'rabban',
      password: '12344556',
    });
  }

  loginAdmin$() {
    return this._http.get('https://api.example.com/users');
  }
}
