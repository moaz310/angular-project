import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy{

  isLoginMode: boolean = true;
  userForm: FormGroup;
  isLoadding: boolean = false;
  errMessage: string;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private alertSub: Subscription;
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
        this.showErrorDialog(errResp);
      }
    })
    this.userForm.reset();
  }

  showErrorDialog(message: string){
    this.alertHost.viewContainerRef.clear();
    const alertInstance = this.alertHost.viewContainerRef.createComponent(AlertComponent);
    alertInstance.instance.message = message;
    this.alertSub = alertInstance.instance.close.subscribe(()=>{
      this.alertSub.unsubscribe();
      this.alertHost.viewContainerRef.clear();
    })
  }

  ngOnDestroy(): void {
    if(this.alertSub){
      this.alertSub.unsubscribe();
    }
  }
}
