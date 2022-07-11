import { Component, OnInit } from '@angular/core';
import {
  PlaidOnEventArgs,
  PlaidOnExitArgs,
  PlaidOnSuccessArgs,
} from 'ngx-plaid-link';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-plaid-link',
  templateUrl: './plaid-link.component.html',
  styleUrls: ['./plaid-link.component.css'],
})
export class PlaidLinkComponent implements OnInit {
  publicKey: string = environment.plaidPublicKey || '';

  constructor() {}

  ngOnInit(): void {}

  onSuccess(event: PlaidOnSuccessArgs) {
    console.log({ success: event });
  }

  onEvent(event: PlaidOnEventArgs) {
    console.log({ event });
  }

  onExit(event: PlaidOnExitArgs) {
    console.log({ error: event });
  }

  onLoad(event: any) {
    console.log({ load: event });
  }

  onClick(event: any) {
    console.log({ click: event });
  }
}
