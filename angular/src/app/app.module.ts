import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import {NgxWigModule} from 'ngx-wig';
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
    MatTableModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatTabsModule,
    MatChipsModule,
    MatPaginatorModule, MatPaginatorIntl, MatSnackBarModule,
} from '@angular/material';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavigatorComponent} from './components/navigator/navigator.component';
import {NewProjectComponent} from './components/new-project/new-project.component';
import { ExpandableTableComponent } from './components/expandable-table/expandable-table.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { MyProjectComponent } from './components/my-project/my-project.component';
import {MglTimelineModule} from 'angular-mgl-timeline';
import { HistoryComponent } from './components/history/history.component';
import { MessagesComponent } from './components/messages/messages.component';
import {UiLoadingComponent} from './components/ui-loading/ui-loading.component';
import {PolishPaginatorIntl} from '../PolishPaginationIntl';
import {HttpClientModule} from '@angular/common/http';
import { FirstUpperPipe } from './pipes/first-upper.pipe';
import { FilterMessagesPipe } from './pipes/filter-messages.pipe';
import { NewMessageComponent } from './components/new-message/new-message.component';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigatorComponent,
    NewProjectComponent,
    NavigatorComponent,
    ExpandableTableComponent,
    NewProjectComponent,
    ProjectDetailsComponent,
    MyProjectComponent,
    HistoryComponent,
    MessagesComponent,
    UiLoadingComponent,
    FirstUpperPipe,
    FilterMessagesPipe,
    NewMessageComponent
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
      MatSnackBarModule,
      MatExpansionModule,
      MatGridListModule,
      MatDialogModule,
      MatTableModule,
      MatDialogModule,
      MatChipsModule,
      MatAutocompleteModule,
      MatSelectModule,
      MatOptionModule,
      ReactiveFormsModule,
      MatCheckboxModule,
      MatTabsModule,
      MglTimelineModule,
      MatPaginatorModule,
      HttpClientModule,
      NgxWigModule
  ],
  providers: [{provide: MatPaginatorIntl, useValue: PolishPaginatorIntl()}],
  bootstrap: [AppComponent],
    entryComponents: [LoginComponent, NewMessageComponent]
})
export class AppModule { }
