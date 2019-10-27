import { Component, OnInit, Input , EventEmitter, Output} from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import {TodoService} from '../../services/todo.service';

@Component({
  selector: 'app-todoitem',
  templateUrl: './todoitem.component.html',
  styleUrls: ['./todoitem.component.css']
})
export class TodoitemComponent implements OnInit {

  @Input() todo: Todo;
  @Output() deleteTodo : EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  // set dynamic class
  setClasses(){
    let classes ={
      todo:true,
      'is-complete': this.todo.completed
    }
    return classes
  }

  // on toggle
  onToggle(todo){
    // toggle in UI
    todo.completed = !todo.completed;
    // toggle on server
    this.todoService.toggleCompleted(todo).subscribe(todo=>console.log(todo));
  }

  onDelete(todo){
    this.deleteTodo.emit(todo);
  }
}
