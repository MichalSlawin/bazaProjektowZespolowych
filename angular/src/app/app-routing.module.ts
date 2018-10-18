import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TestowyComponent} from './components/testowy/testowy.component';
import {NewProjectComponent} from "./components/new-project/new-project.component";

const routes: Routes = [
    {
        path: 'test', component: TestowyComponent
    },
    {
      path: 'nowy-projekt', component: NewProjectComponent
    },
    {
        path: '**',  redirectTo: 'test'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
