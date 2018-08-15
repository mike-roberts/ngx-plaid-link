import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  PlaidErrorMetadata,
  PlaidErrorObject,
  PlaidEventMetadata,
  PlaidOnEventArgs,
  PlaidOnExitArgs,
  PlaidOnSuccessArgs,
  PlaidSuccessMetadata,
  PlaidConfig
} from './interfaces';

export interface ICustomWindow extends Window {
  Plaid: {
    create: Function;
  };
}

function getWindow(): any {
  return window;
}

@Component({
  selector: 'mr-ngx-plaid-link',
  template: `
    <button
      (click)="onClick($event)"
      [class]="className"
      [disabled]="disabledButton"
      [ngStyle]="style">
      {{buttonText}}
    </button>
  `,
  styles: []
})
export class NgxPlaidLinkComponent {

  private defaultProps = {
    apiVersion: 'v2',
    env: 'sandbox',
    institution: null,
    token: null,
    style: {
      'background-color': '#0085e4',
      'transition-duration': '350ms',
      'transition-property': 'background-color, box-shadow',
      'transition-timing-function': 'ease-in-out',
      '-webkit-appearance': 'button',
      'border': '0',
      'border-radius': '4px',
      'box-shadow': '0 2px 4px 0 rgba(0,0,0,0.1), inset 0 1px 0 0 rgba(255,255,255,0.1)',
      'color': '#fff',
      'font-size': '20px',
      'height': '56px',
      'outline': '0',
      'text-align': 'center',
      'text-transform': 'none',
      'padding': '0 2em',
      'cursor': 'pointer'
    },
    buttonText: 'Log In To Your Bank Account',
    webhook: '',
    product: ['auth'],
    className: 'plaid-link-button'
  };

  disabledButton: boolean;
  linkLoaded: boolean;

  linkHandler: any;

  @Input() apiVersion?: string = this.defaultProps.apiVersion;
  @Input() clientName: string;
  @Input() env?: string = this.defaultProps.env;
  @Input() institution?: string = this.defaultProps.institution;
  @Input() publicKey: string;
  @Input() product?: Array<string> = this.defaultProps.product;
  @Input() token?: string = this.defaultProps.token;
  @Input() webhook?: string = this.defaultProps.webhook;
  @Input() style?: any = this.defaultProps.style;
  @Input() className?: string = this.defaultProps.className;
  @Input() buttonText?: string = this.defaultProps.buttonText;

  @Output() Event: EventEmitter<PlaidOnEventArgs> = new EventEmitter();
  @Output() Click: EventEmitter<any> = new EventEmitter();
  @Output() Load: EventEmitter<any> = new EventEmitter();
  @Output() Exit: EventEmitter<PlaidOnExitArgs> = new EventEmitter();
  @Output() Success: EventEmitter<PlaidOnSuccessArgs> = new EventEmitter();

  get nativeWindow(): ICustomWindow {
    return getWindow();
  }

  constructor() {
    this.disabledButton = false;
    this.linkLoaded = false;
  }

  onScriptError() {
    console.error('There was an issue loading the link-initialize.js script');
  }

  public onExit(error: PlaidErrorObject, metadata: PlaidErrorMetadata) {
    this.Exit.emit({
      error: error,
      metadata: metadata
    });
  }

  public onEvent(eventName: string, metadata: PlaidEventMetadata) {
    this.Event.emit({
      eventName: eventName,
      metadata: metadata
    });
  }

  public onSuccess(public_token: string, metadata: PlaidSuccessMetadata) {
    this.Success.emit({
      token: public_token,
      metadata: metadata
    });
  }

  onClick($event) {
    this.Click.emit($event);
    const self = this;
    const config: PlaidConfig = {
      env: self.env,
      key: self.publicKey,
      product: self.product,
      apiVersion: 'v2',
      clientName: self.clientName,
      onSuccess: function (public_token, metadata) {
        self.onSuccess(public_token, metadata);
      },
      onExit: function (err, metadata) {
        self.onExit(err, metadata);
      },
      onEvent: function (eventName, metadata) {
        self.onEvent(eventName, metadata);
      },
      onLoad: function () {
        self.onLoad();
      }
    };
    // Set the optional items.
    if (!!self.token) {
      config.token = self.token;
    }
    if (!!self.webhook) {
      config.webhook = self.webhook;
    }

    this.linkHandler = this.nativeWindow.Plaid.create(config);

    // Open to a specific institution if necessary;
    const institution = this.institution || null;
    if (this.linkHandler) {
      this.linkHandler.open(institution);
    }
  }

  public onLoad($event = 'link_loaded') {
    this.Load.emit($event);
    this.linkLoaded = true;
  }

}
