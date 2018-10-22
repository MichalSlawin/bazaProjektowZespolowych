import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewProjectComponent} from "./components/new-project/new-project.component";
import {ProjectDetailsComponent} from "./components/project-details/project-details.component";

const routes: Routes = [
    {
      path: 'nowy-projekt', component: NewProjectComponent
    },
    {
      path: 'projekt/:id', component: ProjectDetailsComponent
    },
    {
        path: '**',  redirectTo: 'nowy-projekt'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
