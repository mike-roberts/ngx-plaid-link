import { Directive, EventEmitter, HostBinding, HostListener, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { PlaidLinkHandler } from './ngx-plaid-link-handler';
import {
  PlaidErrorMetadata,
  PlaidErrorObject,
  PlaidEventMetadata,
  PlaidOnEventArgs,
  PlaidOnExitArgs,
  PlaidOnSuccessArgs,
  PlaidSuccessMetadata
} from './interfaces';
import { NgxPlaidLinkService } from './ngx-plaid-link.service';

function getWindow(): any {
  return window;
}

export interface ICustomWindow extends Window {
  Plaid: {
    create: Function;
  };
}

@Directive({
  selector: '[ngxPlaidLink]'
})
export class NgxPlaidLinkDirective implements OnInit, OnDestroy {
  @Output() Event: EventEmitter<PlaidOnEventArgs> = new EventEmitter();
  @Output() Click: EventEmitter<any> = new EventEmitter();
  @Output() Load: EventEmitter<any> = new EventEmitter();
  @Output() Exit: EventEmitter<PlaidOnExitArgs> = new EventEmitter();
  @Output() Success: EventEmitter<PlaidOnSuccessArgs> = new EventEmitter();

  @Input() clientName: string;
  

  @HostBinding('disabled') disabledButton: boolean;

  private plaidLinkHandler: PlaidLinkHandler;
  private defaultProps = {
    apiVersion: "v2",
    env: "sandbox",
    institution: null,
    selectAccount: false,
    publicKey: null,
    token: undefined,
    webhook: "",
    product: ["auth"],
    countryCodes: ["US"],
    receivedRedirectUri: null,
    isWebview: false,
  };

  @Input() publicKey?: string = this.defaultProps.publicKey;
  @Input() apiVersion?: string = this.defaultProps.apiVersion;
  @Input() env?: string = this.defaultProps.env;
  @Input() institution?: string = this.defaultProps.institution;
  @Input() product?: Array<string> = this.defaultProps.product;
  @Input() selectAccount?: boolean = this.defaultProps.selectAccount;
  @Input() token?: string = this.defaultProps.token;
  @Input() webhook?: string = this.defaultProps.webhook;
  @Input() countryCodes?: string[] = this.defaultProps.countryCodes;
  @Input() receivedRedirectUri?: string = this.defaultProps.receivedRedirectUri;
  @Input() isWebview?: boolean = this.defaultProps.isWebview;


  constructor(private plaidLinkLoader: NgxPlaidLinkService) {
    this.disabledButton = true;
  }

  async ngOnInit() {
    let handler: PlaidLinkHandler = await this.plaidLinkLoader
      .createPlaid({
        env: this.env,
        key: this.publicKey,
        product: this.product,
        apiVersion: "v2",
        clientName: this.clientName,
        countryCodes: this.countryCodes,
        institution: this.institution || undefined,
        onSuccess: (public_token, metadata) => this.onSuccess(public_token, metadata),
        onExit: (err, metadata) => this.onExit(err, metadata),
        onEvent: (eventName, metadata) => this.onEvent(eventName, metadata),
        onLoad: () => this.onLoad(),
        selectAccount: this.selectAccount,
        token: this.token || undefined,
        webhook: this.webhook || undefined,
        receivedRedirectUri: this.receivedRedirectUri,
        isWebview: this.isWebview
      });
    this.disabledButton = false;
    this.plaidLinkHandler = handler;
  }

  public ngOnDestroy(): void {
    this.plaidLinkHandler.destroy();
  }

  public onExit(error: PlaidErrorObject, metadata: PlaidErrorMetadata) {
    this.Exit.emit({error, metadata});
  }

  public onEvent(eventName: string, metadata: PlaidEventMetadata) {
    this.Event.emit({eventName, metadata});
  }

  public onSuccess(token: string, metadata: PlaidSuccessMetadata) {
    this.Success.emit({token, metadata});
  }

  @HostListener('click', ['$event'])
  onClick($event) {
    this.Click.emit($event);
    // Open to a specific institution if necessary;
    const institution = this.institution || undefined;
    if (this.plaidLinkHandler) {
      this.plaidLinkHandler.open(institution);
    }
  }

  public onLoad($event = "link_loaded") {
    this.Load.emit($event);
  }
}
