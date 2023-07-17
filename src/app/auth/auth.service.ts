import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlSignUp: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCMzGyh7hpwTGyHecZUzrPtVB8A3r1fIDU';
  urlLogIn: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCMzGyh7hpwTGyHecZUzrPtVB8A3r1fIDU';

  user: BehaviorSubject<User> = new BehaviorSubject(null);
  private logoutTimer: any;
  constructor(private http: HttpClient,
              private router: Router) { }

  signUp(email: string, password: string){
    return this.http.post<AuthResponseData>(
      this.urlSignUp,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(
      (errorResponse: HttpErrorResponse)=>{
        return throwError(()=>{return this.errorHandeler(errorResponse)});
      }
    ),
    tap((userResponse)=>{
      this.handleUserAuth(userResponse);
    }));
  }

  logIn(email: string, password: string){
    return this.http.post<AuthResponseData>(
      this.urlLogIn,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(
      (errorResponse: HttpErrorResponse)=>{
        return throwError(()=>{return this.errorHandeler(errorResponse)});
      }
    ),
    tap((userResponse)=>{
      this.handleUserAuth(userResponse);
    }));
  }

  logout(){
    this.user.next(null);
    localStorage.removeItem('userData');
    if(this.logoutTimer){
      clearTimeout(this.logoutTimer);
    }
    this.router.navigate(['/auth'])
  }

  autoLogout(expierationDuration: number){
    this.logoutTimer = setTimeout(()=>{
      this.logout();
    }, expierationDuration);
  }

  autoLogin(){
    const userData = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }
    const loaddedUser: User = new User(userData.email, userData.id, userData._token, new Date(userData._expires_In));
    if(!loaddedUser.token){
      return;
    }
    console.log(loaddedUser);
    this.user.next(loaddedUser);
    const expierationDuration = new Date(userData._expires_In).getTime() - new Date().getTime();
    this.autoLogout(expierationDuration);
  }

  private handleUserAuth(userResponse: AuthResponseData){
    const expireDate = new Date(new Date().getTime() + (+userResponse.expiresIn * 1000));
    const user: User = new User(userResponse.email, userResponse.localId, userResponse.idToken, expireDate);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(+userResponse.expiresIn * 1000);
    this.user.next(user);
  }

  private errorHandeler(errorResponse: HttpErrorResponse): string{
    switch(errorResponse.error.error.message){
      case 'EMAIL_EXISTS':
        return 'Email Already Exists';
      case 'EMAIL_NOT_FOUND':
        return 'No user found with this email';
      case 'INVALID_PASSWORD':
        return 'The password is incorrect';
    }
    return 'Unknown Error Occured'
  }
}
