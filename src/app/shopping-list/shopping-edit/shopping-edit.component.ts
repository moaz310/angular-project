import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  shoppingEditForm: FormGroup;
  subscription: Subscription;
  editingMode = false;
  editItemIndex: number;
  editItem: Ingredient;
  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingEditForm = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'amount' : new FormControl(null, [
        Validators.required,
        Validators.pattern('^[1-9]+[0-9]*$')
      ])
    });

    this.subscription = this.shoppingService.ingrediantEditing.subscribe({
      next: (data: number)=>{
        this.editItemIndex = data;
        this.editingMode = true;
        this.editItem = this.shoppingService.getIngrediant(data);
        this.shoppingEditForm.setValue(this.editItem);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAdd(){
    if(!this.editingMode){
      this.shoppingService.onAddIngrediant({
        name: this.shoppingEditForm.get('name').value,
        amount: this.shoppingEditForm.get('amount').value
      });
    }else{
      this.shoppingService.onUpdateIngrediant(this.editItemIndex, {
        name: this.shoppingEditForm.get('name').value,
        amount: this.shoppingEditForm.get('amount').value
      });
    }
    this.onClear();
  }

  onClear(){
    this.editingMode = false;
    this.shoppingEditForm.reset();
  }

  onDelete(){
    this.shoppingService.deleteIngrediant(this.editItemIndex);
    this.onClear();
  }
}
