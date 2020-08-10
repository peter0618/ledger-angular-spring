import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LedgerComponent} from '@app/routes/ledger/ledger.component';
import {ToastSampleComponent} from "@app/routes/toast-sample/toast-sample.component";

const routes: Routes = [
  {path: 'ledger', component: LedgerComponent},
  {path: '', redirectTo: '/ledger', pathMatch: 'full'},
  {path: 'toast', component: ToastSampleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
