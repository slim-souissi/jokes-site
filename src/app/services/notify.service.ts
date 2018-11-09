import { Injectable, EventEmitter } from '@angular/core';
import { Message } from '../classes/Message';


@Injectable()
export class NotifyService {

    public  newMessageRecieved: EventEmitter<Message> ;

    constructor() {
        this.newMessageRecieved = new EventEmitter() ;
    }

    notify(message: string , type: string ) {
            let newMessage = new Message (message , type) ;
        
            this.newMessageRecieved.emit(newMessage) ;
    }
}
