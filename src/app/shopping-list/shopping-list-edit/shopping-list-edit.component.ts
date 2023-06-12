import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {addIngredient, deleteIngredient, stopEdit, updateIngredient} from "../store/shopping-list.actions";
import * as fromShoppingList from "../store/shopping-list.reducer";
import {AppState} from "../../store/app.reducer";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @Output() ingredientAdded: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();
  @ViewChild('f', {static: true}) shoppingListForm: NgForm;
  editMode = false;
  editedItem: Ingredient;
  subscription: Subscription;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('shopping-list').subscribe({
      next: (state: fromShoppingList.State) => {
        if (state.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = state.editedIngredient;
          this.shoppingListForm.setValue({
            'name': this.editedItem.name,
            'amount': this.editedItem.amount,
          })
        } else {
          this.editMode = false;
        }
      }
    })

  }

  ngOnDestroy() {
    this.store.dispatch(stopEdit());
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.shoppingListForm.reset()
    if (this.editMode) {
      this.store.dispatch(updateIngredient({newIngredient}));
      this.editMode = false;
      return
    }
    this.store.dispatch(addIngredient({ingredient: newIngredient}));
  }

  onClear() {
    this.editMode = false;
    this.shoppingListForm.reset();
    this.store.dispatch(stopEdit());
  }

  onDelete() {
    this.shoppingListForm.reset();
    this.store.dispatch(deleteIngredient());
  }
}
