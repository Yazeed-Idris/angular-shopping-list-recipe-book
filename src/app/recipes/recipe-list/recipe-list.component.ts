import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../../shared/recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{
 recipes: Recipe[] = []
  subscription: Subscription;
 constructor(private recipeService: RecipeService,
             private router: Router,
             private route: ActivatedRoute) {
   this.recipes = recipeService.getRecipes();
 }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  ngOnInit() {
   this.subscription = this.recipeService.recipesChanged.subscribe(
     (recipes) => {
       this.recipes = recipes;
     }
   )
  }

  ngOnDestroy() {
   this.subscription.unsubscribe();
  }
}
