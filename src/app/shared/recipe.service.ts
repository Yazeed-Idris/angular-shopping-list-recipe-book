import {Injectable} from '@angular/core';
import {Recipe} from "../recipes/recipe.model";
import {Ingredient} from "./ingredient.model";
import {ShoppingListService} from "./shopping-list.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      0,
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fires', 20)
      ]),
    new Recipe(
      1,
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]),
    new Recipe(
      2,
      'Recipe 3',
      'This is simply a test',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg',
      []),
  ]

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.slice()[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
   this.shoppingListService.addIngredients(ingredients)
  }
  constructor(private shoppingListService: ShoppingListService) {

  }
}
