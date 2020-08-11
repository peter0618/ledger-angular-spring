import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgxChartsModule, BrowserAnimationsModule],
  exports: [NgxChartsModule, BrowserAnimationsModule],
})
export class SharedModule {}
