import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {LedgerComponent} from '../ledger/ledger.component';
import {ToastSampleComponent} from '../toast-sample/toast-sample.component';
import {MainPageComponent} from '../layout/main-page/main-page.component';

const routes: Routes = [
  {path: 'ledger', component: LedgerComponent},
  {path: 'toast', component: ToastSampleComponent},
  {path: '', component: MainPageComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class RouteModule {}
