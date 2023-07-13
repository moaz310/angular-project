import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 
    'This is simply a test', 
    'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    [
      new Ingredient('meat', 10),
      new Ingredient('rice', 540)
    ]),
    new Recipe('A New Recipe',
    'This is simply a test',
    'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    [
      new Ingredient('chicken', 10),
      new Ingredient('pasta', 540)
    ])
  ];
  recipesSubject: Subject<Recipe[]> = new Subject<Recipe[]>;
  constructor(private shoppingService: ShoppingListService) { 
  }

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(id: number): Recipe{
    return this.recipes[id];
  }

  updateRecipe(id: number, recipe: Recipe){
    this.recipes[id] = recipe;
    this.recipesSubject.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesSubject.next(this.recipes.slice());
  }

  deleteRecipe(id: number){
    this.recipes.splice(id, 1);
    this.recipesSubject.next(this.recipes.slice());
  }

  addToShoppingList(ingrediants: Ingredient[]){
    this.shoppingService.onAddIngrediants(ingrediants);
  }  
}
