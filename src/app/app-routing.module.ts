import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'plaid-link',
    loadChildren: () =>
      import('./plaid-link/plaid-link.module').then((m) => m.PlaidLinkModule),
  },
  {
    path: '',
    redirectTo: 'plaid-link',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'plaid-link'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
