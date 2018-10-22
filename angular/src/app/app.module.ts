import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import {
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule, MatTabsModule
} from '@angular/material';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NavigatorComponent} from "./components/navigator/navigator.component";
import {NewProjectComponent} from "./components/new-project/new-project.component";
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { MyProjectComponent } from './components/my-project/my-project.component';
import {MglTimelineModule} from "angular-mgl-timeline";
import { HistoryComponent } from './components/history/history.component';
import { MessagesComponent } from './components/messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigatorComponent,
    NewProjectComponent,
    ProjectDetailsComponent,
    MyProjectComponent,
    HistoryComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
      FormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
      MatGridListModule,
      MatDialogModule,
      MatChipsModule,
      MatAutocompleteModule,
      MatSelectModule,
      MatOptionModule,
      ReactiveFormsModule,
      MatCheckboxModule,
      MatTabsModule,
      MglTimelineModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
    entryComponents: [LoginComponent]
})
export class AppModule { }
