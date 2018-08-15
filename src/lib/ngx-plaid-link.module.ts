import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPlaidLinkComponent } from './ngx-plaid-link.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgxPlaidLinkComponent],
  exports: [NgxPlaidLinkComponent]
})
export class NgxPlaidLinkModule { }
