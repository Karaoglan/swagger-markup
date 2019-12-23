import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GraphicsComponent} from "./graphics/graphics.component";
import {ClimatesComponent} from "./climates/climates.component";

const routes: Routes = [
  {
    path: 'climates',
    component: ClimatesComponent,
  },
  { path: '',
    redirectTo: '/climates',
    pathMatch: 'full'
  },
  { path: 'graphics', component: GraphicsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
