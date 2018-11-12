import { Component, OnInit, Input , OnChanges} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FollowService } from 'src/app/services/follow.service';


@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit , OnChanges {

  @Input() currentProfileId ;
  public isFollowing ;
  public isLoading = false ;
  constructor(
    private authService: AuthService ,
    private followService: FollowService,
    ) { }

  ngOnInit() {
    this.checkIfFollowing() ;
  }

  checkIfFollowing() {
    this.followService.isFollowing(this.currentProfileId)
    .then((resp) => {
      this.isFollowing = resp ;
      console.log(resp) ;
    });
  }


  ngOnChanges(changes) {
    console.log(changes) ;
  }

  unfollow() {
    this.isLoading = true ;
    this.isFollowing = true ;
    this.followService.unfollow(this.currentProfileId)
    .then((resp) => {
      this.isLoading = false ;
      this.isFollowing = false ;
      console.log(resp) ;
    }) ;
  }

  follow() {
    this.isLoading = true ;
    this.followService.follow(this.currentProfileId)
    .then((resp) => {
      this.isFollowing = true ;
      console.log(resp) ;
      this.isLoading = false ;
    }) ;
  }

}
