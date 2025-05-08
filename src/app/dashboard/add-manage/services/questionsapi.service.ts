import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionsapiService {
  private apiUrl = 'http://localhost:8080/questions';
  constructor(private http: HttpClient) {}

  getQuestionsList(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createQuestion(question: any): Observable<any> {
    return this.http.post(this.apiUrl, question);
  }

  putQuestion(question: any): Observable<any> {
    return this.http.put(this.apiUrl + '/' + question.id, question);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
