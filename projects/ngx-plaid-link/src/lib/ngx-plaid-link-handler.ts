import { PlaidConfig, PlaidExitArgs } from './interfaces';

declare let Plaid: any;

export class PlaidLinkHandler {
  /**
   * Holds the Plaid Link instance.
   */
  private plaidLink: any;

  /**
   * Constructor configures the Plaid Link handler with given config options.
   * @param PlaidConfig config
   */
  constructor(config: PlaidConfig) {
    this.plaidLink = Plaid.create(config);
  }

  /**
   * Open the Plaid Link window for this handler.
   * @param string institution The name of the institution to open
   */
  public open(institution?: string): void {
    this.plaidLink.open(institution);
  }

  /**
   * Closes the currently open Plaid Link window if any.
   */
  public exit(options?: PlaidExitArgs): void {
    this.plaidLink.exit();
  }

  /**
   * Destroys Link Handler instance and removes all DOM artifacts.
   */
  public destroy(): void {
    this.plaidLink.destroy();
  }
}
