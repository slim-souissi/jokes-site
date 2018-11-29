import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {FormControl, Validators} from '@angular/forms' ;
import { JokesService } from '../services/jokes.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css']
})
export class JokeComponent implements OnInit {
  @Input() joke ;
  @Output() jokeDeleted = new EventEmitter() ;
  title: FormControl;
  content:  FormControl ;
  public editing = false ;
  constructor(private jokeService: JokesService,
    private authService: AuthService ) { }

  ngOnInit() {
    this.title =  new FormControl(this.joke.title , Validators.required);
    this.content = new FormControl(this.joke.joke , Validators.required) ;
  }

  canModify(): boolean {
    return this.joke.user.id == this.authService.getAuthUserId() ;
  }
  edit() {
    this.editing = true ;
  }
  updateJoke() {
    this.jokeService.updateJoke(+this.joke.id ,{
      title: this.title.value ,
      content: this.content.value
    })
    .then(resp => {
      this.joke = resp ;
      this.editing = false ;
    }) ;
     
  }
  cancel() {
    this.title.reset() ;
    this.content.reset() ;
    this.editing = false ;
  }

  deleteJoke() {
    this.jokeService.deleteJoke(this.joke.id)
    .then((resp) => {
      this.jokeDeleted.emit(this.joke.id) ;
    });
  }

}
