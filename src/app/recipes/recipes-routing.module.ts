import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { PleaseSelectRecipeComponent } from "./please-select-recipe/please-select-recipe.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipe-resolver.service";
import { RecipesComponent } from "./recipes.component";

const routes: Routes = [
    {
        path: '', component: RecipesComponent, canActivate: [AuthGuard], children: [
            { path: '', component: PleaseSelectRecipeComponent },
            { path: 'new', component: RecipeEditComponent },
            {
                path: ':id', component: RecipeDetailComponent,
                resolve: { recipes: RecipeResolverService }
            },
            {
                path: ':id/edit', component: RecipeEditComponent,
                resolve: { recipes: RecipeResolverService }
            }
        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {

}