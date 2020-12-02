# NGX Plaid Link

A wrapper component to make using Plaid Link easy in Angular 6+.

_This has been tested to work in at least 1 Angular 5 app as well_

## How to use

#### 1a) Install from NPM

```shell
$ npm install ngx-plaid-link
```

#### 1b) Or Yarn

```shell
$ yarn add ngx-plaid-link
```

#### 2) Import the NgxPlaidLinkModule

```typescript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { NgxPlaidLinkModule } from "ngx-plaid-link";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxPlaidLinkModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
#### 3a) The easy way, the `ngxPlaidLink` Directives

```html
<button ngxPlaidLink
  env="sandbox"
  publicKey="YOURPUBLICKEY"
  institution=""
  [countryCodes]="['US', 'CA', 'GB']"
  (Success)="onPlaidSuccess($event)"
  (Exit)="onPlaidExit($event)"
  (Load)="onPlaidLoad($event)"
  (Event)="onPlaidEvent($event)"
  (Click)="onPlaidClick($event)"
>Link Your Bank Account</button>
```

#### 3b) The easy way, with the provided button

```html
<mr-ngx-plaid-link-button
  env="sandbox"
  publicKey="YOURPUBLICKEY"
  institution=""
  [countryCodes]="['US', 'CA', 'GB']"
  (Success)="onPlaidSuccess($event)"
  (Exit)="onPlaidExit($event)"
  (Load)="onPlaidLoad($event)"
  (Event)="onPlaidEvent($event)"
  className="launch-plaid-link-button"
  buttonText="Link Your Bank Account"
  (Click)="onPlaidClick($event)"
></mr-ngx-plaid-link-button>
```

#### 3b) The less easy way, implement yourself

Since most of the functionality is through the service you can imlpement this yourself to customize to your needs further.

```typescript
import { Component, AfterViewInit } from "@angular/core";
import {
  PlaidErrorMetadata,
  PlaidErrorObject,
  PlaidEventMetadata,
  PlaidOnEventArgs,
  PlaidOnExitArgs,
  PlaidOnSuccessArgs,
  PlaidSuccessMetadata,
  PlaidConfig,
  NgxPlaidLinkService,
  PlaidLinkHandler
} from "ngx-plaid-link";

export class ComponentThatImplementsPlaidLink implements AfterViewInit {
  private plaidLinkHandler: PlaidLinkHandler;

  private config: PlaidConfig = {
    apiVersion: "v2",
    env: "sandbox",
    institution: null,
    selectAccount: false,
    token: null,
    webhook: "",
    product: ["auth"],
    countryCodes: ['US', 'CA', 'GB']
    key: "YOURPUBLICKEY"
  };

  constructor(private plaidLinkService: NgxPlaidLinkService) {}

  // Create and open programatically once the library is loaded.
  ngAfterViewInit() {
    this.plaidLinkService
      .createPlaid(
        Object.assign({}, config, {
          onSuccess: (token, metadata) => this.onSuccess(token, metadata),
          onExit: (error, metadata) => this.onExit(error, metadata),
          onEvent: (eventName, metadata) => this.onEvent(eventName, metadata)
        })
      )
      .then((handler: PlaidLinkHandler) => {
        this.plaidLinkHandler = handler;
        this.open();
      });
  }

  open() {
    this.plaidLinkHandler.open();
  }

  exit() {
    this.plaidLinkHandler.exit();
  }

  onSuccess(token, metadata) {
    console.log("We got a token:", token);
    console.log("We got metadata:", metadata);
  }

  onEvent(eventName, metadata) {
    console.log("We got an event:", eventName);
    console.log("We got metadata:", metadata);
  }

  onExit(error, metadata) {
    console.log("We exited:", error);
    console.log("We got metadata:", metadata);
  }
}
```

#### Available Configuration

This is all there in the types, but here they are for convenience.

| Attribute/prop | input/output | optional/required | Type     | Default                       | Description                                                                                                                         |
| -------------- | ------------ | ----------------- | -------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| apiVersion     | input        | optional          | string   | v2                            | The version of the Plaid Link api to use                                                                                            |
| buttonText     | input        | optional          | string   | `Log In To Your Bank Account` | You can customize the text on the button by providing text here.                                                                    |
| className      | input        | optional          | string   | null                          | A class or classes to apply to the button inside the component                                                                      |
| clientName     | input        | required          | string   | null                          | The name of your application, gets used in the Plaid Link UI.                                                                       |
| countryCodes   | input        | optional          | string[] | ['US']                        | An array of strings of [Plaid supported country codes](https://plaid.com/docs/faq/#does-plaid-support-international-bank-accounts-) |
| env            | input        | optional          | string   | sandbox                       | Can be one of available plaid environments: `sandbox`, `development`, or `production`                                               |
| institution    | input        | optional          | string   | null                          | If you want to launch a specific institution                                                                                        |
| product        | input        | optional          | string[] | ['auth']                      | An array of the names of the products you'd like to authorize. Available options are `transactions`, `auth`, and `identity`.        |
| publicKey      | input        | conditional          | string   | null                          | The key (publiKey) parameter in PlaidLink create is [deprecated](https://plaid.com/docs/link/web/#link-web-create-key). The public key from your Plaid account _Make sure it's the public key and not the private key_                                      |
| token          | input        | conditional          | string   | null                          | If you're using link_tokens this field is required and will be the [link_token](https://plaid.com/docs/link/web/#link-web-create-token). If you're still using the public key (legacy), then this field is optional and is for if you are re-authenticating or updating an item that has previously been linked.               |
| style          | input        | optional          | object   | An object of styles           | An ngStyle object that can be used to apply styles and customize the plaid link button to match your app.                           |
| selectAccount          | input        | optional          | boolean   | false                          | Setting this to `TRUE` will allow the user to select their bank account from a list through the plaid modal. `FALSE` does not show the account list prompt.                           |
| webhook        | input        | optional          | string   | null                          | You can provide a webhook for each item that Plaid will send events to.                                                             |
| Exit           | output       | required          | function | n/a                           | Passes the result from the onExit function to your component                                                                        |
| Success        | output       | required          | function | n/a                           | Passes the result from the onSuccess function to your component                                                                     |
| Click          | output       | optional          | function | n/a                           | Lets you act on the event when the button is clicked                                                                                |
| Event          | output       | optional          | function | n/a                           | Passes the result from the onEvent function to your component                                                                       |
| Load           | output       | optional          | function | n/a                           | Lets you act on the event when the Plaid Link stuff is all loaded                                                                   |

## How to contribute

Coming soon...
