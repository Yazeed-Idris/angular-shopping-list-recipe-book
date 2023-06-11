import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./recipes.component";
import {AuthGuard} from "../auth/auth.guard";
import {EmptyRecipeComponent} from "./empty-recipe/empty-recipe.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {recipeResolver} from "./recipes-resolver.service";

const routes: Routes = [
  {
    path: '', component: RecipesComponent, canActivate: [AuthGuard], children: [
      {path: '', component: EmptyRecipeComponent, pathMatch: 'full'},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [recipeResolver]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [recipeResolver]}
    ]
  },
]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecipesRoutingModule {

}
