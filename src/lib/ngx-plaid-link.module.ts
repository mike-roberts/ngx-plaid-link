import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPlaidLinkButtonComponent } from './ngx-plaid-link-button.component';
import { NgxPlaidLinkService } from './ngx-plaid-link.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    NgxPlaidLinkService
  ],
  declarations: [NgxPlaidLinkButtonComponent],
  exports: [NgxPlaidLinkButtonComponent]
})
export class NgxPlaidLinkModule { }
