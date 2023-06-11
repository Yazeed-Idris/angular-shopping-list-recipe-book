import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "./recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {map, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService) {
  }

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://ng-complete-guide-e8bda-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(
        (response) => {
          console.log(response)
        }
      )
  }

  fetchData() {
    return this.http.get<Recipe[]>('https://ng-complete-guide-e8bda-default-rtdb.firebaseio.com/recipes.json')
      .pipe(
        map((data) => {
          return data.map((el) => {
            return {...el, ingredients: el.ingredients ?? []}
          })
        }),
        tap(data => {
          this.recipeService.setRecipes(data)
        })
      )
  }
}
