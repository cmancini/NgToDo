import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';

import { AppTodoService } from './_services/app.todo.service';
import { Todo }           from './_models/todo';

@Component({
  selector:    'app-root',
  templateUrl: './app.component.html',
  styleUrls:   ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {
  
  constructor(
    private AppTodoService: AppTodoService,
  ) {}

  active_todo:   Todo;
  todos:         Array<any> = [];
  todoSub:       Observable<any>;
  production:    boolean = environment.production;
  todo_edit:     boolean = false;
  show_archived: boolean = false;

  // ngOnInit = = = = =
  // ngOnInit = = = = =
  // ngOnInit = = = = =

  ngOnInit() {
    this.log("[NgToDo] INIT");
    this.loadTodos();
  }

  // ngAfterViewInit = = = = =
  // ngAfterViewInit = = = = =
  // ngAfterViewInit = = = = =

  ngAfterViewInit() { }

  // loadTodos = = = = =
  // loadTodos = = = = =
  // loadTodos = = = = =

  loadTodos() {
    this.log("[NgToDo] LOAD todos");
    this.todoSub = this.AppTodoService.getTodos();
    this.todoSub.subscribe( (e) => this.setTodos(e) );
  }

  // setTodos = = = = =
  // setTodos = = = = =
  // setTodos = = = = =

  setTodos(_todos:any) {
    this.log("[NgToDo] SET todos", _todos);
    this.todos = _todos ? _todos : [];
  }

  // saveTodos = = = = =
  // saveTodos = = = = =
  // saveTodos = = = = =

  saveTodos() {
    this.log("[NgToDo] SAVE todos");
    this.cancelTodoEdit();
    this.todoSub = this.AppTodoService.saveTodos(this.todos);
  }

  // showCreateTodo = = = = =
  // showCreateTodo = = = = =
  // showCreateTodo = = = = =

  showCreateTodo() {
    this.log("[NgToDo] CREATE todo");
    this.active_todo      = new Todo();
    this.active_todo.type = "active";
    this.todo_edit        = true;
  }

  // showEditTodo = = = = =
  // showEditTodo = = = = =
  // showEditTodo = = = = =

  showEditTodo(_id:number) {
    this.active_todo = this.getTodoById(_id);
    this.todo_edit   = true;
  }

  // cancelTodoEdit = = = = =
  // cancelTodoEdit = = = = =
  // cancelTodoEdit = = = = =

  cancelTodoEdit() {
   this.log("[NgToDo] CANCEL EDIT todo");
   this.todo_edit = false; 
   delete this.active_todo;
  }

  // saveTodoEdit = = = = =
  // saveTodoEdit = = = = =
  // saveTodoEdit = = = = =

  saveTodoEdit() {
    this.log("[NgToDo] SAVE EDIT todo");
    this.active_todo.id        = Math.floor(Math.random()*10000000);
    this.active_todo.active    = true;
    this.active_todo.init_date = new Date().getTime();
    this.todos.push(this.active_todo);
    this.todo_edit = false; 
    this.saveTodos();
  }

  // showArchived = = = = =
  // showArchived = = = = =
  // showArchived = = = = =

  showArchived() {
    this.log("[NgToDo] SHOW ARCHIVED");
    this.show_archived = true;
  }

  // activeTodos = = = = =
  // activeTodos = = = = =
  // activeTodos = = = = =

  activeTodos() {
    return this.todos.filter((item) => item.active && !item.completed_date);
  }

  // completedTodos = = = = =
  // completedTodos = = = = =
  // completedTodos = = = = =

  completedTodos() {
    return this.todos.filter((item) => item.active && item.completed_date).sort((a: Todo, b: Todo) =>
        a.completed_date - b.completed_date
    );
  }

  // archivedTodos = = = = =
  // archivedTodos = = = = =
  // archivedTodos = = = = =

  archivedTodos() {
    return this.todos.filter((item) => !item.active);
  }

  // toggleTodoState = = = = =
  // toggleTodoState = = = = =
  // toggleTodoState = = = = =

  toggleTodoState(_id:number) {
    this.log("[NgToDo] TOGGLE STATE", _id);
    let _todo = this.getTodoById(_id);
    _todo.active = !_todo.active;
    this.saveTodos();
    if (!this.archivedTodos().length) this.show_archived = false;
  }

  // completeTodo = = = = =
  // completeTodo = = = = =
  // completeTodo = = = = =

  completeTodo(_id:number) {
    let _todo = this.getTodoById(_id);
    _todo.completed_date = new Date().getTime();
    this.saveTodos();
  }

  // getTodoById = = = = =
  // getTodoById = = = = =
  // getTodoById = = = = =

  getTodoById(_id:number) {
    return this.todos.filter((item) => item.id == _id)[0];
  }

  // log = = = = =
  // log = = = = =
  // log = = = = =

  log(_msg:string, _obj:any=undefined) {
    if (!this.production) typeof _obj !== "undefined" ? console.log(_msg, _obj) : console.log(_msg);
  }


}
