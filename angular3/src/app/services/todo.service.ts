import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

const baseUrl = 'http://localhost:8080/api/todos';
//const baseUrl = 'http://localhost:8080/api/todos';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  addExtra(): Observable<any> {
    return this.http.get(`${baseUrl}/add/10`);
  }
  addExtra100(): Observable<any> {
    return this.http.get(`${baseUrl}/add/100`);
  }
  addExtra1000(): Observable<any> {
    return this.http.get(`${baseUrl}/add/1000`);
  }
  addExtra3000(): Observable<any> {
    return this.http.get(`${baseUrl}/add/3000`);
  }

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(baseUrl);
  }



  get(id: any): Observable<Todo> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }


}
