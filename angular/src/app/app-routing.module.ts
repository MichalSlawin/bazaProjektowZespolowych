import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlankLayoutComponent} from './layouts/blankLayout.component';
import {TestowyComponent} from './components/testowy/testowy.component';
import {BasicLayoutComponent} from './layouts/basicLayout.component';
import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
    {
        path: '', component: BasicLayoutComponent,
        children: [
            {path: 'test', component: TestowyComponent}
        ]
    },
    {
        path: '', component: BlankLayoutComponent,
        children: [
            {path: 'login', component: LoginComponent},
        ]
    },
    {
        path: '**',  redirectTo: ''
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
