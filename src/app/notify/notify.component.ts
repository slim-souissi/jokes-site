import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../services/notify.service';
import { Message } from '../classes/Message';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {

  public message: Message ;
  constructor(
    private notifyService: NotifyService
  ) {
    this.notifyService.newMessageRecieved.subscribe((message) => this.newMessageRecieved(message) );
  }

  newMessageRecieved(message: Message) {
    this.message = message ;

    setTimeout(() => {
      this.message = new  Message('', '');
    }, 2000);
  }

  ngOnInit() {
  }

}
