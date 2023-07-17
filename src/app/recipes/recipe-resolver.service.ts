import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { RecipesService } from "./recipes.service";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private recipeService: RecipesService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        return this.recipeService.getRecipes().length > 0 ? this.recipeService.getRecipes() : this.recipeService.fetchRecipes();
    }

}