import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import {ActionReducerMap} from "@ngrx/store";

export interface AppState {
  'shopping-list': fromShoppingList.State;
  'auth': fromAuth.State
}

export const appReducer: ActionReducerMap<AppState> = {
  'shopping-list': fromShoppingList.shoppingListReducer,
  'auth': fromAuth.authReducer,
}
