import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  constructor(private recipeService: RecipesService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (data)=>{
        this.recipe = this.recipeService.getRecipe(data['id']);
      }
    )
  }

  addToShoppingList(){
    this.recipeService.addToShoppingList(this.recipe.ingrediants);
  }
}
