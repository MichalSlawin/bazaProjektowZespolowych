import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewProjectComponent} from "./components/new-project/new-project.component";
import {ProjectDetailsComponent} from "./components/project-details/project-details.component";
import {MyProjectComponent} from "./components/my-project/my-project.component";
import {ExpandableTableComponent} from "./components/expandable-table/expandable-table.component";


const routes: Routes = [
    {
      path: 'nowy-projekt', component: NewProjectComponent
    },
    {
      path: 'projekt/:id', component: ProjectDetailsComponent
    },
    {
      path: 'moj-projekt', component: MyProjectComponent
    },
    {
        path: 'projekty', component: ExpandableTableComponent
    },
    {
        path: '**',  redirectTo: 'projekty'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
