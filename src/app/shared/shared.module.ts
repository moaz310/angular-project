import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        DropdownDirective,
        LoadingSpinnerComponent,
        AlertComponent,
        PlaceholderDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DropdownDirective,
        LoadingSpinnerComponent,
        AlertComponent,
        PlaceholderDirective,
        CommonModule
    ]
})
export class SharedModule{}