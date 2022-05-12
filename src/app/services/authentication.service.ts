import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loginUrl = " http://localhost:3000/auth/v1 ";
  isAuthenticatedUrl = "http://localhost:3000/auth/v1/isAuthenticated";

  constructor(private http: HttpClient) { }

  authenticateUser(data: any){
    return this.http.post(this.loginUrl,data);
  }
  setBearerToken(token: any){
    localStorage.setItem('bearerToken', token);
  }
  getBearerToken(){ 
    return localStorage.getItem('bearerToken');
  }
  isUserAuthenticated(){
    let header = new HttpHeaders().set('Authorization' ,  `Bearer ${this.getBearerToken()}`)
    return this.http.post(this.isAuthenticatedUrl,{} ,{'headers' : header } )
  }
}
