import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgFlyoutModule } from 'ng-flyout';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    NgFlyoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
