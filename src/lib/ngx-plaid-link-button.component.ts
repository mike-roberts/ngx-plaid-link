import { Component, EventEmitter, Input, Output } from "@angular/core";
import { PlaidOnEventArgs, PlaidOnExitArgs, PlaidOnSuccessArgs } from './interfaces';
import { ICustomWindow } from './ngx-plaid-link.directive';

function getWindow(): any {
  return window;
}

@Component({
  selector: "mr-ngx-plaid-link-button",
  template: `
    <button ngxPlaidLink
            [class]="className"
            [ngStyle]="style"
            [publicKey]="publicKey"
            [clientName]="clientName"
            [apiVersion]="apiVersion"
            [env]="env"
            [institution]="institution"
            [product]="product"
            [token]="token"
            [webhook]="webhook"
            [countryCodes]="countryCodes"
            (Success)="onDirectiveSuccess($event)"
            (Exit)="onDirectiveExit($event)"
            (Load)="onDirectiveLoad($event)"
            (Event)="onDirectiveEvent($event)"
            (Click)="onDirectiveClick($event)"
    >
      {{ buttonText }}
    </button>
  `,
  styles: []
})
export class NgxPlaidLinkButtonComponent {

  @Input() clientName: string;
  @Input() publicKey: string;
  @Output() Event: EventEmitter<PlaidOnEventArgs> = new EventEmitter();
  @Output() Success: EventEmitter<PlaidOnSuccessArgs> = new EventEmitter();
  @Output() Click: EventEmitter<any> = new EventEmitter();
  @Output() Load: EventEmitter<any> = new EventEmitter();
  @Output() Exit: EventEmitter<PlaidOnExitArgs> = new EventEmitter();
  private defaultProps = {
    apiVersion: "v2",
    env: "sandbox",
    institution: null,
    token: null,
    webhook: "",
    product: ["auth"],
    countryCodes: ["US"],
    style: {
      "background-color": "#0085e4",
      "transition-duration": "350ms",
      "transition-property": "background-color, box-shadow",
      "transition-timing-function": "ease-in-out",
      "-webkit-appearance": "button",
      border: "0",
      "border-radius": "4px",
      "box-shadow":
        "0 2px 4px 0 rgba(0,0,0,0.1), inset 0 1px 0 0 rgba(255,255,255,0.1)",
      color: "#fff",
      "font-size": "20px",
      height: "56px",
      outline: "0",
      "text-align": "center",
      "text-transform": "none",
      padding: "0 2em",
      cursor: "pointer"
    },
    buttonText: "Log In To Your Bank Account",
    className: "plaid-link-button",
  };
  @Input() apiVersion?: string = this.defaultProps.apiVersion;
  @Input() env?: string = this.defaultProps.env;
  @Input() institution?: string = this.defaultProps.institution;
  @Input() product?: Array<string> = this.defaultProps.product;
  @Input() token?: string = this.defaultProps.token;
  @Input() webhook?: string = this.defaultProps.webhook;
  @Input() countryCodes?: string[] = this.defaultProps.countryCodes;
  @Input() style?: any = this.defaultProps.style;
  @Input() buttonText?: string = this.defaultProps.buttonText;
  @Input() className?: string = this.defaultProps.className;

  constructor() {}

  get nativeWindow(): ICustomWindow {
    return getWindow();
  }

  onScriptError() {
    console.error("There was an issue loading the link-initialize.js script");
  }

  onDirectiveSuccess(event: PlaidOnSuccessArgs) {
    this.Success.emit(event);
  }

  onDirectiveExit(event: PlaidOnExitArgs) {
    this.Exit.emit(event);
  }

  onDirectiveLoad(event) {
    this.Load.emit(event);
  }

  onDirectiveEvent(event: PlaidOnEventArgs) {
    this.Event.emit(event);
  }

  onDirectiveClick(event) {
    this.Click.emit(event);
  }
}
