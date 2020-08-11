import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {LayoutModule} from '@app/layout/layout.module';
import {LedgerComponent} from '@app/routes/ledger/ledger.component';
import {ToastSampleComponent} from '@app/routes/toast-sample/toast-sample.component';
import {LayoutComponent} from '@app/layout/layout.component';
import {LoginComponent} from '@app/routes/login/login.component';
import {ChartComponent} from '@app/routes/chart/chart.component';
import {SharedModule} from '@app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'ledger', component: LedgerComponent},
      {path: 'toast', component: ToastSampleComponent},
      {path: 'chart', component: ChartComponent},
      {path: '', redirectTo: '/ledger', pathMatch: 'full'},
    ],
  },
];

@NgModule({
  declarations: [LedgerComponent, ToastSampleComponent, LoginComponent, ChartComponent],
  imports: [LayoutModule, RouterModule.forRoot(routes), CommonModule, SharedModule],
  exports: [RouterModule],
})
export class RouteModule {}
