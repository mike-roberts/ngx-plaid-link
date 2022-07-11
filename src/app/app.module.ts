import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaidLinkModule } from './plaid-link/plaid-link.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, PlaidLinkModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
