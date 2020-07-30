import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { LedgerComponent } from '@app/ledger/ledger.component';
import { ToastSampleComponent } from '@app/toast-sample/toast-sample.component';
import { StatisticsComponent } from '@app/statistics/statistics.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent },
  {path: 'ledger', component: LedgerComponent},
  {path: 'toast', component: ToastSampleComponent},
  {path: 'show', component: StatisticsComponent},
  {path: '', redirectTo: '/ledger', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    LedgerComponent,
    ToastSampleComponent,
    StatisticsComponent
  ],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
