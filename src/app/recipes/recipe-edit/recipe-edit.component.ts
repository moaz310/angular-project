import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean = false;
  editRecipe: Recipe;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router) {
    this.recipeForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'imagePath': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'ingrediants': new FormArray([])
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        if (this.editMode) {
          this.editRecipe = this.recipesService.getRecipe(this.id);
          this.formFill();
        }
      }
    )
  }
  
  formFill() {
    this.recipeForm.patchValue(this.editRecipe);
    for (let ingredient of this.editRecipe.ingrediants) {
      (<FormArray>this.recipeForm.get('ingrediants')).push(new FormGroup({
        'name': new FormControl(ingredient.name, Validators.required),
        'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
      })
      );
    }
  }
  
  get ingrediantsControls(){
    return (<FormArray>this.recipeForm.get('ingrediants')).controls;
  }
  
  onAddIngrediant(){
    console.log('sad');
    (<FormArray>this.recipeForm.get('ingrediants')).push(new FormGroup({
      'name': new FormControl('', Validators.required),
      'amount': new FormControl('', [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
    }));
  }
  
  onDeleteIngrediant(id: number){
    (<FormArray>this.recipeForm.get('ingrediants')).removeAt(id);
  }

  onSubmit() {
    if(this.editMode){
      this.recipesService.updateRecipe(this.id, this.recipeForm.value);
    }else{
      this.recipesService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  
}
