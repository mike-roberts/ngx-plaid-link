import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PlaidLinkComponent } from './plaid-link.component';
import { NgxPlaidLinkModule } from 'ngx-plaid-link';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: PlaidLinkComponent,
  },
];

@NgModule({
  declarations: [PlaidLinkComponent],
  imports: [RouterModule.forChild(routes), CommonModule, HttpClientModule, NgxPlaidLinkModule],
})
export class PlaidLinkModule {}
