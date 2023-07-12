import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private ingrediantEmitter: Subscription;
  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngrediants();
    this.ingrediantEmitter = this.shoppingService.ingrediantChanged.subscribe(
      (date)=>{
        this.ingredients = date;
      }
    )
  }

  ngOnDestroy(): void {
    this.ingrediantEmitter.unsubscribe();
  }

  onEditing(index: number){
    this.shoppingService.ingrediantEditing.next(index);

  }
}
