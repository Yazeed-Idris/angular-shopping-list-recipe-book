import {Component} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {startEdit} from "./store/shopping-list.actions";
import {AppState} from "../store/app.reducer";


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<AppState>) {
    this.ingredients = this.store.select('shopping-list')
  }

  onEditItem(index: number) {
    this.store.dispatch(startEdit({index: index}))
  }
}
