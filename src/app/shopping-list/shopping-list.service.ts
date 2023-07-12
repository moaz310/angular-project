import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingrediantChanged = new Subject<Ingredient[]>();
  ingrediantEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  
  constructor() { }
  
  getIngrediant(index: number): Ingredient{
    return this.ingredients.at(index);
  }

  getIngrediants(){
    return this.ingredients.slice();
  }
  
  onUpdateIngrediant(index: number, ingredient: Ingredient){
    this.ingredients[index] = ingredient;
    this.ingrediantChanged.next(this.ingredients.slice());
  }

  deleteIngrediant(index: number){
    this.ingredients.splice(index, 1);
    this.ingrediantChanged.next(this.ingredients.slice());
  }

  onAddIngrediant(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingrediantChanged.next(this.ingredients.slice());
  }

  onAddIngrediants(ingrediants: Ingredient[]) {
    this.ingredients.push(...ingrediants);
    this.ingrediantChanged.next(this.ingredients.slice());
  }
}
