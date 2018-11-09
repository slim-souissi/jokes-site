import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http , Headers , RequestOptions } from '@angular/http';
import {CONFIG} from './../config/config' ;
import { User } from '../classes/User';
// import 'rxjs/add/operator/toPromise' ;

@Injectable()
export class UserService {

    private headers: Headers ;

    constructor(
        private authService: AuthService,
        private http: Http
    ) {
        this.headers = new Headers({'Authorization': `Bearer ${this.authService.getToken()}`}) ;
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
}
