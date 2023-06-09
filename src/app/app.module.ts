import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import {EmptyRecipeComponent} from './recipes/empty-recipe/empty-recipe.component';
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";
import {StoreModule} from '@ngrx/store';
import {appReducer} from "./store/app.reducer";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EmptyRecipeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(appReducer, {}),
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule {
}
