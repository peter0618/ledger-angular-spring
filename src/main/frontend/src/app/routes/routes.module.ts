import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {LayoutModule} from '@app/layout/layout.module';
import {LedgerComponent} from '@app/routes/ledger/ledger.component';
import {ToastSampleComponent} from '@app/routes/toast-sample/toast-sample.component';
import { LayoutComponent } from '@app/layout/layout.component';

const routes: Routes = [
  {path: '',
  component: LayoutComponent,
  children: [
    {path: 'ledger', component: LedgerComponent},
    {path: 'toast', component: ToastSampleComponent},
  ]
}

];

@NgModule({
  declarations: [LedgerComponent, ToastSampleComponent],
  imports: [LayoutModule, RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class RouteModule {}
