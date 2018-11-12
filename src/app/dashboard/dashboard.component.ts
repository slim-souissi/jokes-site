import { Component, OnInit } from '@angular/core';
import { JokesService } from '../services/jokes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 public data ;
  constructor(private jokeService: JokesService ) { }

  ngOnInit() {
  this.getJokes() ;
  }

  getNextJokes() {
    this.getJokes(this.data.next_page_url) ;
  }

  getPreviousJokes() {
    this.getJokes(this.data.prev_page_url) ;
  }

  getJokes(endPoint = null) {
    this.jokeService.getAllJokes(endPoint)
    .then((resp) => {
      console.log(resp) ;
      this.data = resp ;
    }) ;
  }
}
