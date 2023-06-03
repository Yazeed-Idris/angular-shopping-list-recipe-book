import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../../shared/shopping-list.service";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent {
  @Output() ingredientAdded: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();
  @ViewChild('nameInput', {static: true}) nameInput: ElementRef;
  @ViewChild('amountInput', {static: true}) amountInput: ElementRef;
  constructor(private shoppingListService: ShoppingListService) {
  }
  onAddIngredient() {
    const name = this.nameInput.nativeElement.value;
    const amount = this.amountInput.nativeElement.value;
    if (name === '' || amount === '') return;
    const newIngredient = new Ingredient(name, amount)
    this.shoppingListService.addIngredient(newIngredient);
  }
}
