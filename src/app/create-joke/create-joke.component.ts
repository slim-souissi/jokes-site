import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validator, Validators} from '@angular/forms' ;
import { JokesService } from '../services/jokes.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-create-joke',
  templateUrl: './create-joke.component.html',
  styleUrls: ['./create-joke.component.css']
})
export class CreateJokeComponent implements OnInit {

  private jokeForm: FormGroup ;

  constructor(private fb: FormBuilder ,
    private jokesService: JokesService,
    private router: Router ,
    private authService: AuthService) { }

  ngOnInit() {
    this.createForm() ;
  }

  createForm() {
    this.jokeForm = this.fb.group(
      {
        title: ['' , [
          Validators.required
        ]],
        content: ['' , [
          Validators.required ,
          Validators.minLength(5)
        ]]
      }
    );
  }


  onSubmit() {
    console.log(this.jokeForm.value);
    this.jokesService.createJoke(this.jokeForm.value)
    .then((resp) => {
      console.log(resp) ;
      this.router.navigate([`user/profile/${this.authService.getAuthUserId()}`]);    }) ;
   }
}
