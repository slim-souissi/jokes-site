import { Injectable } from '@angular/core';
import {CONFIG} from './../config/config';
import { Http } from '@angular/http' ;
// import 'rxjs/add/operator/toPromise' ;
import {Router} from '@angular/router' ;
import {UserData} from '../classes/UserData' ;
import {User} from '../classes/User' ;
@Injectable()
export class AuthService {

    constructor(
        private http: Http ,
        private router: Router) {}

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

                this.router.navigate(['/dashboard']) ;
        }


}
