import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  
  id: number;
  editMode: boolean = false;
  editRecipe: Recipe;
  constructor(private route: ActivatedRoute,
              private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params)=>{
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        if(this.editMode){
          this.editRecipe = this.recipesService.getRecipe(this.id);
        }
      }
    )
  }

}
