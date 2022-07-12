import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import {
  PlaidOnEventArgs,
  PlaidOnExitArgs,
  PlaidOnSuccessArgs,
} from 'ngx-plaid-link';

@Component({
  selector: 'app-plaid-link',
  templateUrl: './plaid-link.component.html',
  styleUrls: ['./plaid-link.component.css'],
})
export class PlaidLinkComponent implements OnInit, AfterViewInit {
  public tokenFetched: boolean = false;
  // Fetch this from your backend.
  public linkToken = '';
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    // Make request to backend...
    setTimeout(() => this.enableButton(), 3000);
  }

  enableButton() {
    // Set the link token and show the button.
    this.linkToken = 'Your link token from backend...';
    this.tokenFetched = true;
  }

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
