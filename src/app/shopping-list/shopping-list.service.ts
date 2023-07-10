import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingrediantChanged = new EventEmitter<Ingredient[]>();
  
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  
  constructor() { }
  
  getIngrediants(){
    return this.ingredients.slice();
  }
  
  onAddIngrediant(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingrediantChanged.emit(this.ingredients.slice());
  }

  onAddIngrediants(ingrediants: Ingredient[]) {
    this.ingredients.push(...ingrediants);
    this.ingrediantChanged.emit(this.ingredients.slice());
  }
}
