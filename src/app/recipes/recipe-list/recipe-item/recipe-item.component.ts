import { Component, Input, OnInit} from '@angular/core';
import { Recipe } from '../../recipe.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input('recipeItem') recipe: Recipe;
  @Input() idx: number;
  constructor(private router: Router) { }
  
  ngOnInit() {
  }
  
}
