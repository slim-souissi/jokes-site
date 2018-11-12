import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http , Headers , RequestOptions } from '@angular/http';
import {CONFIG} from './../config/config' ;
import { User } from '../classes/User';

@Injectable()
export class JokesService {
    private headers: Headers ;

    constructor(
        private authService: AuthService,
        private http: Http
    ) {
        this.headers = new Headers({
            'Authorization': `Bearer ${this.authService.getToken()}`}) ;
    }
    createJoke(joke): Promise<any> {
        let url = `${CONFIG.API_URL}/jokes` ;
        let body = {title: joke.title , joke: joke.content } ;
        let options = new RequestOptions({headers: this.headers}) ;
        return this.http.post(url , body , options)
        .toPromise()
        .then((resp) => {
            return resp.json() ;
        }) ;
    }

    getAllJokes(endPoint = null) {
        let url ;
        if (endPoint) {
            url = endPoint ;
        } else {
             url = `${CONFIG.API_URL}/jokes` ;
        }
        let options = new RequestOptions({headers: this.headers}) ;
        return this.http.get(url , options)
        .toPromise()
        .then((resp) => {
            return resp.json() ;
        }) ;    }
}
