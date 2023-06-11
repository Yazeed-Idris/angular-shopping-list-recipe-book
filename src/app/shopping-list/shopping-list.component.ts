import {Component, OnDestroy} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shared/shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnDestroy {
  ingredients: Ingredient[] = [];
  private isChangeSub: Subscription;
  constructor(private shoppingListService: ShoppingListService) {
    this.ingredients = shoppingListService.getIngredients()
    this.isChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients) => {
        this.ingredients = ingredients;
      })
    console.log('ingredients:', this.ingredients)
  }


  ngOnDestroy() {
   this.isChangeSub.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
