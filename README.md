# NGX Plaid Link

A wrapper component to make using Plaid Link easy in Angular 6+. 

*This has been tested to work in at least 1 Angular 5 app as well*

## How to use

#### 1a) Install from NPM

```shell
$ npm install ngx-plaid-link
```
 
#### 1b) Or Yarn

```shell
$ yarn add ngx-plaid-link
```

#### 2) Add Plaid Link js to index.html

```html
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>NgxPlaidLinkApp</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>

<body>
  <app-root></app-root>
  <!-- add this to your index.html file -->
  <script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"></script>
</body>

</html>
```


#### 3) Import the NgxPlaidLinkModule

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxPlaidLinkModule } from 'ngx-plaid-link';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxPlaidLinkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

#### 4) Add to your component template

```html
<mr-ngx-plaid-link env="sandbox" publicKey="YOURPUBLICKEY" institution="" (Success)="onPlaidSuccess($event)"
  (Exit)="onPlaidExit($event)" (Load)="onPlaidLoad($event)" (Event)="onPlaidEvent($event)" className="launch-plaid-link-button"
  buttonText="Link Your Bank Account" (Click)="onPlaidClick($event)"></mr-ngx-plaid-link>
```

#### Available Configuration
This is all there in the types, but here they are for convenience.

Attribute/prop | input/output | optional/required | Type | Default | Description
-------------- | ------------ | ----------------- | ---- | ------- | -----------
clientName | input | required | string | null | The name of your application, gets used in the Plaid Link UI.
publicKey | input | required | string | null | The public key from your Plaid account *Make sure it's the public key and not the private key*
apiVersion | input | optional | string | v2 | The version of the Plaid Link api to use
buttonText | input | optional | string | `Log In To Your Bank Account` | You can customize the text on the button by providing text here.
className | input | optional |string | null | A class or classes to apply to the button inside the component
env | input | optional | string | sandbox | Can be one of available plaid environments: `sandbox`, `development`, or `production`
institution | input | optional | string | null | If you want to launch a specific institution
product | input | optional | string[] | ['auth'] | An array of the names of the products you'd like to authorize. Available options are `transactions`, `auth`, and `identity`.
style | input | optional | object | An object of styles | An ngStyle object that can be used to apply styles and customize the plaid link button to match your app.
token | input | optional | string | null | You can provide a token if you are re-authenticating or updating an item that has previously been linked.
webhook | input | optional | string | null | You can provide a webhook for each item that Plaid will send events to.
Exit | output | required | function | n/a | Passes the result from the onExit function to your component
Success  | output | required | function | n/a | Passes the result from the onSuccess function to your component
Click | output | optional | function | n/a | Lets you act on the event when the button is clicked
Event | output | optional | function | n/a | Passes the result from the onEvent function to your component
Load | output | optional | function | n/a | Lets you act on the event when the Plaid Link stuff is all loaded

## How to contribute
Coming soon...
