import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LedgerComponent} from './ledger/ledger.component';
import {HttpClientModule} from '@angular/common/http';
import {ToastSampleComponent} from './toast-sample/toast-sample.component';
import {MainPageComponent} from './layout/main-page/main-page.component';
import {RouteModule} from './routes/routes.module';

@NgModule({
  declarations: [AppComponent, LedgerComponent, ToastSampleComponent, MainPageComponent],
  imports: [BrowserModule, HttpClientModule, RouteModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
