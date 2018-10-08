import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';


import {BasicLayoutComponent} from './basicLayout.component';
import {BlankLayoutComponent} from './blankLayout.component';

import {NavigatorComponent} from './navigator/navigator.component';
import {FooterComponent} from './footer/footer.component';
import {MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule, MatButtonModule} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';


@NgModule({
  declarations: [
    FooterComponent,
    BasicLayoutComponent,
    BlankLayoutComponent,
    NavigatorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
      BrowserAnimationsModule,
      NgbModule.forRoot(),
      MatSidenavModule,
      MatToolbarModule,
      MatIconModule,
      MatListModule,
      LayoutModule,
      MatButtonModule
  ],
  exports: [
    FooterComponent,
    BasicLayoutComponent,
    BlankLayoutComponent,
    NavigatorComponent
  ],
})

export class LayoutsModule {}
