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
    MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatCardModule, MatGridListModule, MatDialogModule
} from '@angular/material';
import { TestowyComponent } from './components/testowy/testowy.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from "@angular/forms";
import {NavigatorComponent} from "./components/navigator/navigator.component";

@NgModule({
  declarations: [
    AppComponent,
    TestowyComponent,
    LoginComponent,
    NavigatorComponent
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
      MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
    entryComponents: [LoginComponent]
})
export class AppModule { }
