import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// PfReportService = = = = =
// PfReportService = = = = =
// PfReportService = = = = =

export class AppTodoService {

  public  is_init:     boolean = false;
  private observable:  Observable<any>;
  private todo_key:    string = 'NgToDos';
  private TodoSub;

  // constructor = = = = =
  // constructor = = = = =
  // constructor = = = = =

  constructor() {
    this.init();
  }

  // init = = = = =
  // init = = = = =
  // init = = = = =

  init() {
    console.log("INIT: AppTodoService");
    this.is_init = true;
  }

  // getTodos = = = = =
  // getTodos = = = = =
  // getTodos = = = = =

  getTodos(): Observable<any>  {
    return of(JSON.parse(localStorage.getItem(this.todo_key)));
  }

  // saveTodos = = = = =
  // saveTodos = = = = =
  // saveTodos = = = = =

  saveTodos(_todos:any): Observable<any> {
    localStorage.setItem(this.todo_key, JSON.stringify(_todos));
    return of(true);
  }

}