import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject, map, tap } from 'rxjs';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private url: string = 'https://angular-bebc0-default-rtdb.firebaseio.com/recipes.json'

  private recipes: Recipe[] = [];

  recipesSubject: Subject<Recipe[]> = new Subject<Recipe[]>;
  constructor(private shoppingService: ShoppingListService,
              private http: HttpClient) { 
  }

  saveRecipes(){
    this.http.put(
      this.url,
      this.recipes
    ).subscribe({
      next: ()=>{
        console.log('saved');
      }
    });
  }

  fetchRecipes(){
    return this.http.get(
      this.url
    ).pipe(map((recipes: Recipe[])=>{
      return recipes.map((recipe)=>{
        return {...recipe, ingrediants: recipe.ingrediants === undefined ? [] : recipe.ingrediants};
      })
    }),
    tap(
      (data: Recipe[])=>{
        this.recipes = data;
        this.recipesSubject.next(this.recipes);
      }
    ));
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
    /**this.http.put(
      this.url,
      [recipe]).subscribe();**/
  }

  deleteRecipe(id: number){
    this.recipes.splice(id, 1);
    this.recipesSubject.next(this.recipes.slice());
  }

  addToShoppingList(ingrediants: Ingredient[]){
    this.shoppingService.onAddIngrediants(ingrediants);
  }  
}
