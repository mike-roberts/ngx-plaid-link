import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPlaidLinkButtonComponent } from './ngx-plaid-link-button.component';
import { NgxPlaidLinkService } from './ngx-plaid-link.service';
import { NgxPlaidLinkDirective } from './ngx-plaid-link.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    NgxPlaidLinkService
  ],
  declarations: [NgxPlaidLinkButtonComponent, NgxPlaidLinkDirective],
  exports: [NgxPlaidLinkButtonComponent, NgxPlaidLinkDirective]
})
export class NgxPlaidLinkModule { }
