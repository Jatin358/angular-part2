import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { RouterService } from 'src/app/services/router.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  serverMessage: any;
  token: any;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, 
    private router : Router, private routerService: RouterService, private snackbar: MatSnackBar) { 
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  loginSubmit(){
    let loginObject = {
      username : this.loginForm.value.username, 
      password: this.loginForm.value.password
    }

      this.authenticationService.authenticateUser(loginObject).subscribe((response: any) => {
        if(response.token){
          this.token = response.token;
          this.authenticationService.setBearerToken(this.token);
          this.isAuthenticated();
          console.log(this.token);
          setTimeout(() => {
            this.snackbar.open('Login Successful','CLOSE');
          }, 200); 
          
        }else{
          this.serverMessage = response.message;
          setTimeout(() => {
            this.snackbar.open(this.serverMessage,'CLOSE');
          }, 200); 
        }
    }, (error: any) =>{
        setTimeout(() => {
          this.snackbar.open("Unauthorized Access",'CLOSE');
        }, 200);    
    });
    
  }
  isAuthenticated(){
      this.authenticationService.isUserAuthenticated().subscribe((response: any) =>{
          if(response.isAuthenticated){
            console.log(response.isAuthenticated);
            this.routerService.routeToDashboard();
          }else{
            setTimeout(() => {
              this.snackbar.open("Authentication Failed",'CLOSE');
            }, 200); 
            
          }
      }, (error: any) =>{
        setTimeout(() => {
          this.snackbar.open("Authentication Failed",'CLOSE');
        }, 200); 
      })
  }

}
