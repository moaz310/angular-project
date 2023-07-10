import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') name: ElementRef;
  @ViewChild('amountInput') amount: ElementRef;
  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit() {
  }

  onAdd(){
    this.shoppingService.onAddIngrediant({
      name: this.name.nativeElement.value,
      amount: this.amount.nativeElement.value
    });
  }
}
