import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TestowyComponent} from './components/testowy/testowy.component';

const routes: Routes = [
    {
        path: 'test', component: TestowyComponent
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
