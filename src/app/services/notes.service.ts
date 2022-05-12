import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  token: any;
  
  getNotesUrl = " http://localhost:3000/api/v1/notes";
  addNotesUrl = "http://localhost:3000/api/v1/notes ";

  
  
  constructor(private http: HttpClient, private authenticationService : AuthenticationService){
    this.token = authenticationService.getBearerToken();
  }

  getNotes(){

    let header = new HttpHeaders().set('Authorization' ,  `Bearer ${this.token}`)
    return this.http.get(this.getNotesUrl,{'headers': header});
  }
  addNote(data: any){
    let header = new HttpHeaders().set('Authorization' ,  `Bearer ${this.token}`)
    return this.http.post(this.addNotesUrl, data, {'headers' : header })
  } 
}
