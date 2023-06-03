import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shared/shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnChanges{
  ingredients: Ingredient[] = []
  constructor(private shoppingListService: ShoppingListService) {
    this.ingredients = shoppingListService.getIngredients()
    this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients) => {
        this.ingredients = ingredients;
      })
    console.log('ingredients:', this.ingredients)
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes:', changes)
  }
}
