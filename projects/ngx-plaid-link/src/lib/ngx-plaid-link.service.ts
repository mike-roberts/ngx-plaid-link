import { Injectable } from '@angular/core';
import { PlaidCreateConfig } from './interfaces';
import { PlaidLinkHandler } from './ngx-plaid-link-handler';

@Injectable({providedIn: 'root'})
export class NgxPlaidLinkService {
  private loaded?: Promise<void>;

  constructor() {}

  /**
   * Create a Plaid Link instance as soon as Plaid Link has loaded.
   * @param PlaidCreateOptions config
   * @returns Promise<PlaidLinkHandler>
   */
  public createPlaid(config: PlaidCreateConfig): Promise<PlaidLinkHandler> {
    return this.loadPlaid().then(() => {
      return new PlaidLinkHandler(config);
    });
  }

  /**
   * Load or wait for the Plaid Link library to load.
   * @returns Promise<void>
   */
  public loadPlaid(): Promise<void> {
    if (!this.loaded) {
      this.loaded = new Promise<void>((resolve, reject) => {
        const script: any = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://cdn.plaid.com/link/v2/stable/link-initialize.js';
        script.onerror = (e: any) => reject(e);
        if (script.readyState) {
          script.onreadystatechange = () => {
            if (
              script.readyState === 'loaded' ||
              script.readyState === 'complete'
            ) {
              script.onreadystatechange = null;
              resolve();
            }
          };
        } else {
          script.onload = () => {
            resolve();
          };
        }
        document.getElementsByTagName('body')[0].appendChild(script);
      });
    }

    return this.loaded;
  }
}
