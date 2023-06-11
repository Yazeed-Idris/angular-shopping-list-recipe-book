import {inject} from "@angular/core";
import {ResolveFn} from "@angular/router";
import {Recipe} from "./recipe.model";
import {Observable} from "rxjs";
import {DataStorageService} from "../shared/data-storage.service";
import {RecipeService} from "../shared/recipe.service";
export const recipeResolver: ResolveFn<Recipe[]> =
  (): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] => {
    const dataStorageService = inject(DataStorageService);
    const recipesService = inject(RecipeService);
    const recipes = recipesService.getRecipes();
    if (recipes.length === 0) {
      return dataStorageService.fetchData();
    }
    return recipes;
  }

