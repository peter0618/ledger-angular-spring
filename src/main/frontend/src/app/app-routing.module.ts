import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LedgerComponent} from './ledger/ledger.component';

const routes: Routes = [
  {path: 'ledger', component: LedgerComponent},
  {path: '', redirectTo: '/ledger', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
