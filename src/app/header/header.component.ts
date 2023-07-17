import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipesService } from '../recipes/recipes.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  userSub: Subscription;
  isAuthenticated: boolean = false;
  constructor(private recipesService: RecipesService,
              private authService: AuthService){}
  
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(
      (user)=>{
        this.isAuthenticated = !!user;
      }
    );

  }

  saveData(){
    this.recipesService.saveRecipes();
  }

  getData(){
    this.recipesService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }
}
