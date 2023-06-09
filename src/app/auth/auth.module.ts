import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {AuthRoutingModule} from "./auth-routing.module";

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    AuthRoutingModule,
  ],
  exports: [AuthComponent],
})
export class AuthModule {}
