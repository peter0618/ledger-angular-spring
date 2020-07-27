import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LedgerComponent} from './ledger/ledger.component';
import {HttpClientModule} from '@angular/common/http';
import { ToastSampleComponent } from './toast-sample/toast-sample.component';

@NgModule({
  declarations: [AppComponent, LedgerComponent, ToastSampleComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
