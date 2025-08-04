import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserupdateserviceService {
  private apiUrl = 'http://localhost:8080/users';
  constructor(private http: HttpClient) {}

  updateUserScore(
    userId: number,
    score: number,
    submit_time: any
  ): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${userId}`, {
      score,
      submissionTime: submit_time,
    });
  }
}
