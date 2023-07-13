import { Component, OnDestroy, OnInit} from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{
  recipes: Recipe[] = [];
  recipeChange: Subscription;
  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes();
    this.recipeChange = this.recipesService.recipesSubject.subscribe(
      (data: Recipe[])=>{
        this.recipes = data;
      }
    )
  }

  ngOnDestroy(): void {
    this.recipeChange.unsubscribe();
  }
}
