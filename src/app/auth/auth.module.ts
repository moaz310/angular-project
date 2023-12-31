import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { AuthGuard } from "./auth.guard";

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path: '', component: AuthComponent, canActivate: [AuthGuard]}
        ])
    ]
})
export class AuthModule{}