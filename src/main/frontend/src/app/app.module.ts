import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {RouteModule} from './routes/routes.module';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [AppComponent],
  imports: [LayoutModule, BrowserModule, HttpClientModule, RouteModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
