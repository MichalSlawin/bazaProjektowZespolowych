import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewProjectComponent} from "./components/new-project/new-project.component";
import {MyProjectComponent} from "./components/my-project/my-project.component";
import {ExpandableTableComponent} from "./components/expandable-table/expandable-table.component";
import {ProjectShowComponent} from "./components/project-show/project-show.component";
import {WorkerTableComponent} from "./components/worker-table/worker-table.component";
import {ProjectEditComponent} from "./components/project-edit/project-edit.component";
import {AdminPanelComponent} from "./components/admin-panel/admin-panel.component";


const routes: Routes = [
    {
      path: 'nowy-projekt', component: NewProjectComponent
    },
    {
      path: 'projekt/:id', component: ProjectShowComponent
    },
    {
      path: 'moj-projekt', component: MyProjectComponent
    },
    {
        path: 'projekty', component: ExpandableTableComponent
    },
    {
        path: 'pracownik-projekty', component: WorkerTableComponent
    },
    {
        path: 'edytuj-projekt', component: ProjectEditComponent
    },
    {
        path: 'panel-administracyjny', component: AdminPanelComponent
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
