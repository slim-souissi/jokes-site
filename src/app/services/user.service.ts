import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http , Headers , RequestOptions } from '@angular/http';
import {CONFIG} from './../config/config' ;
import { User } from '../classes/User';
// import 'rxjs/add/operator/toPromise' ;
import {EventEmitter} from '@angular/core' ;
@Injectable()
export class UserService {

    private headers: Headers ;
     userProfileUpdated = new EventEmitter() ;

    constructor(
        private authService: AuthService,
        private http: Http
    ) {
        this.headers = new Headers({'Authorization': `Bearer ${this.authService.getToken()}`}) ;
    }


    getUserWall(id: number)  {
        let options = new RequestOptions({headers: this.headers});
        let url = `${CONFIG.API_URL}/user/profile/${id}/wall` ;
        return this.http.get(url , options)
        .toPromise()
        .then((resp) =>  resp.json()  ) ;
    }

    getUserById(id: number): Promise<User> {
        if (id === this.authService.getAuthUserId()) {
            return Promise.resolve(this.authService.getAuthUser() ) ;
        }

        let options = new RequestOptions({headers: this.headers});

        return this.http.get(`${CONFIG.API_URL}/user/${id}`, options)
        .toPromise()
        .then((response) => {
            return response.json() ;
        }) ;
    }

    updateProfile(name: string , email: string): Promise<User> {

        const url = `${CONFIG.API_URL}/user/update` ;
        let body = {name: name , email: email} ;
        let options = new RequestOptions({ headers : this.headers}) ;
    
        return this.http.put(url, body , options)
        .toPromise()
        .then((response) => {
            let user = response.json().data ;
            localStorage.setItem('user', JSON.stringify(user)) ;

            this.userProfileUpdated.emit(user) ;
            return user ;
        });
      }
    
}
