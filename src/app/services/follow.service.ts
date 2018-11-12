import { Injectable } from '@angular/core';
import { Http, RequestOptions , Headers} from '@angular/http';
import { NotifyService } from './notify.service';
import { CONFIG } from '../config/config';
import { AuthService } from './auth.service';

@Injectable()
export class FollowService {
    private headers:  Headers;
     constructor(
        private http: Http,
        private noty: NotifyService,
        private authService: AuthService
    ) {
        this.headers = new Headers({
            // 'Access-Control-Allow-Origin' : '*' ,
            // 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS' ,
            'Authorization': `Bearer ${this.authService.getToken()}` })  ;
    }

    unfollow(id: number) {
        const url = `${CONFIG.API_URL}/user/unfollow` ;
        let body = {user_to_unfollow_id : id} ;
        let options = new RequestOptions ({headers: this.headers}) ;
        return this.http.post(url , body , options )
        .toPromise()
        .then((resp) => {
            return resp.json() ;
        }) ;
    }

    follow(id: number): Promise<boolean> {
        const url = `${CONFIG.API_URL}/user/follow` ;
        let body = {user_to_follow_id : id} ;
        let options = new RequestOptions ({headers: this.headers}) ;
        return this.http.post(url , body , options )
        .toPromise()
        .then((resp) => {
            return resp.json() ;
        }) ;
    }

    isFollowing(id: number): Promise<boolean> {
        let url = `${CONFIG.API_URL}/user/is/following` ;
        let body = {user_to_check_if_is_following_id : id} ;
        let options = new RequestOptions ({headers: this.headers}) ;
        return this.http.post(url , body , options )
        .toPromise()
        .then((response) => {
            // alert('Done') ;
            return response.json().following ;
        }) ;
    }
}
