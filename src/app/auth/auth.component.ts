import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode: boolean = true;
  userForm: FormGroup;
  isLoadding: boolean = false;
  errMessage: string;
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      'email' : new FormControl(null, [Validators.email, Validators.required]),
      'password' : new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(){
    this.isLoadding = true;
    const email:string = this.userForm.get('email')?.value;
    const password:string = this.userForm.get('password')?.value;
    let authObserveble: Observable<AuthResponseData>;
    if(!this.isLoginMode){
      authObserveble = this.authService.signUp(email, password);
    }
    else{
      authObserveble = this.authService.logIn(email, password);
    }
    authObserveble.subscribe({
      next: (data)=>{
        this.isLoadding = false;
        this.router.navigate(['/recipes'])
      },
      error: (errResp)=>{
        console.log(errResp);
        this.isLoadding = false;
        this.errMessage = errResp;
      }
    })
    this.userForm.reset();
  }
}
