import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {

  public jokes ;
  public id: number ;
  @Input() joke ;
  constructor(
    private userService: UserService ,
    private router: ActivatedRoute ,
    private authService: AuthService) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.id = +params['id'] ;
      this.getUserWall() ;
    });
  }


  getUserWall() {
     this.userService.getUserWall(this.id)
                .then((resp) => {
                  this.jokes = resp.data ;
                    }
     );
  }

  jokeDeleted(jokeId) {
    let joke = this.jokes.find((j) => {
      return jokeId == j.id ;
    }) ;

    let jokeIndex = this.jokes.indexOf(joke) ;

   this.jokes.splice( jokeIndex , 1) ;
  }

}
