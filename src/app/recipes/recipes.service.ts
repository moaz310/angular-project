import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

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
  selectedRecipe = new EventEmitter<Recipe>();
  constructor(private shoppingService: ShoppingListService) { }

  getRecipes(){
    return this.recipes.slice();
  }

  addToShoppingList(ingrediants: Ingredient[]){
    this.shoppingService.onAddIngrediants(ingrediants);
  }
}
