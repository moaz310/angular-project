import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShoppingListRoutsModule } from "./shopping-list-routes.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        ShoppingListRoutsModule
    ]
})
export class ShoppingListModule {

}