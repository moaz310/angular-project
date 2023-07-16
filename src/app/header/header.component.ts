import { Component } from '@angular/core';
import { RecipesService } from '../recipes/recipes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private recipesService: RecipesService){}

  saveData(){
    this.recipesService.saveRecipes();
  }

  getData(){
    this.recipesService.fetchRecipes().subscribe();
  }
}
