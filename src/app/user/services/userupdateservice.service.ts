import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserupdateserviceService {
  private apiUrl = 'http://localhost:8080/users/submit';
  constructor(private http: HttpClient) {}

  updateUserScore(userId: number, score: number, data?: any): Observable<any> {
    return this.http.put(this.apiUrl + '/' + userId + '/' + score, data);
  }
}
