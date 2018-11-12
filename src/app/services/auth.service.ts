import { Injectable, OnInit , OnDestroy } from '@angular/core';
import {CONFIG} from './../config/config';
import { Http } from '@angular/http' ;
// import 'rxjs/add/operator/toPromise' ;
import {Router} from '@angular/router' ;
import {UserData} from '../classes/UserData' ;
import {User} from '../classes/User' ;
import { Token } from '@angular/compiler';
import { NotifyService } from './notify.service';
@Injectable()
export class AuthService  {

    constructor(
        private http: Http ,
        private router: Router,
        private notifyService: NotifyService,
        ) {}


        getAuthUser(): User  {
            return JSON.parse(localStorage.getItem('user')) ;

        }

        getAuthUserId(): number {
            return JSON.parse(localStorage.getItem('user')).id ;

        }
        getToken(): string {
            return localStorage.getItem('token') ;
        }

    register(name: string , email: string , password: string): Promise<UserData> {
        return this.http.post(`${CONFIG.API_URL}/register`, { name: name, email: email, password: password })
        .toPromise()
        .then((response) => {
                console.log(response) ;
                let token = response.json().token ;
                let user = response.json().user.data ;

                let userData = new UserData(token , user) ;

                return userData ;
            });
        }


        logUserIn(userData: UserData): void {
            localStorage.setItem('token', userData.token) ;
                localStorage.setItem('user', JSON.stringify(userData.user)) ;
                this.notifyService.notify('succefully logged In', 'success');

                this.router.navigate(['/dashboard']) ;
        }

        logIn(email: string , password: string): Promise<UserData> {

            return this.http.post(`${CONFIG.API_URL}/authenticate` , {email: email , password: password })
            .toPromise()
            .then((response) => {
                let token = response.json().token;
                let user = response.json().user.data;

                let userData = new UserData(token , user ) ;
                
                return userData ;
            })
            ;
        }
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('user') ;
            this.router.navigate(['/auth/login']) ;
        }


        isLoggedIn(): boolean {
            let token = localStorage.getItem('token');
            let user = localStorage.getItem('user');

            if (user && token ) { return true ;
            }

            return false ;
        }

}
