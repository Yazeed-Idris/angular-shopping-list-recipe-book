import {createAction, props} from "@ngrx/store";
import {Ingredient} from "../../shared/ingredient.model";

export const addIngredient = createAction(
  '[Shopping-List] AddIngredient',
  props<{ingredient: Ingredient}>()
)

export const addIngredients = createAction(
  '[Shopping-List] AddIngredients',
  props<{ingredients: Ingredient[]}>()
)

export const deleteIngredient = createAction(
  '[Shopping-List] DeleteIngredient',
)

export const updateIngredient = createAction(
  '[Shopping-List] UpdateIngredient',
  props<{newIngredient: Ingredient}>()
)

export const startEdit = createAction(
  '[Shopping-List] StartEdit',
  props<{index: number}>()
)

export const stopEdit = createAction(
  '[Shopping-List] StopEdit'
)
