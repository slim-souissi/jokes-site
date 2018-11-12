import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/User';
import { AuthService } from 'src/app/services/auth.service';
import { CONFIG } from './../../config/config';
import { UserService } from 'src/app/services/user.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user: User ;

  constructor(private authService: AuthService,
    private userService: UserService ,
    private notifyService: NotifyService) { }

  ngOnInit() {
    this.user = this.authService.getAuthUser() ;
  }
  editProfile() {
    this.userService.updateProfile(this.user.name, this.user.email)
      .then((user) => {
        this.user = user ;

        this.notifyService.notify('Profile Succefully Updated' , 'success') ; 
      })
    ;
  }


}
