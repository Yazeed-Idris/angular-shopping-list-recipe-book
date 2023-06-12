import {createReducer, on} from "@ngrx/store";
import {Ingredient} from "../../shared/ingredient.model";
import {
  addIngredient,
  addIngredients,
  deleteIngredient,
  startEdit,
  stopEdit,
  updateIngredient
} from "./shopping-list.actions";

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}



const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1,
}
export const shoppingListReducer = createReducer(
  initialState,
  on(addIngredient, (state, action) => {
    return {
      ...state,
      ingredients: [...state.ingredients, action.ingredient]
    }
  }),
  on(addIngredients, (state, action) => {
    return {
      ...state,
      ingredients: [...state.ingredients, ...action.ingredients]
    }
  }),
  on(updateIngredient, (state, action) => {
    const ingredient = state.ingredients[state.editedIngredientIndex];
    const updatedIngredient: Ingredient = {
      ...ingredient,
      ...action.newIngredient
    }
    const updatedIngredients: Ingredient[] = [...state.ingredients]
    updatedIngredients[state.editedIngredientIndex] = updatedIngredient
    return {
      ...state,
      ingredients: [...updatedIngredients],
      editedIngredient: null,
      editedIngredientIndex: -1,
    }
  }),
  on(deleteIngredient, (state, action) => {
    const copyIngredients = state.ingredients.slice();
    copyIngredients.splice(state.editedIngredientIndex, 1);
    return {
      ...state,
      ingredients: [...copyIngredients],
      editedIngredient: null,
      editedIngredientIndex: -1,
    }
  }),
  on(startEdit, (state, action) => {
    return {
      ...state,
      editedIngredientIndex: action.index,
      editedIngredient: {...state.ingredients[action.index]}
    }
  }),
  on(stopEdit, (state, action) => {
    return {
      ...state,
      editedIngredientIndex: -1,
      editedIngredient: null
    }
  }),
)
