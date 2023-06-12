import {createReducer, on} from "@ngrx/store";
import {User} from "../user.model";
import {login, logout} from "./auth.actions";

export interface State {
  user: User
}

const initialState: State = {
  user: null
}
export const authReducer = createReducer(
  initialState,
  on(login, (state, {type, email, userId, token, expirationDate}) => {
    const user = new User(email, userId, token, expirationDate);
    return {
      ...state,
      user: user,
    };
  }),
  on(logout, (state, action) => {
    return {
      ...state,
      user: null,
    }
  })
)
