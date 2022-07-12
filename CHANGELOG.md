# Changelog

## 14.0.0
* Refactored interfaces to better support Plaid Link going forward
  * Renamed: PlaidConfig to LegacyPlaidConfig
  * New Interface: PlaidConfig, only supports latest parameters of Plaid Link create docs
  * New Type: PlaidCreateConfig - a union between LegacyPlaidConfig and PlaidConfig which is used to pass to
* ngxPlaidLink directive allows button to be programmatically disabled eg. fetching token from backend.

### Breaking Changes
I tried to make as few breaking changes as possible, but there is one scenario where you could need to update your code.
* PlaidConfig interface - If you used the exported PlaidConfig interface in your code, you may need to change it to LegacyPlaidConfig if you're using the old publicKey flow which is deprecated and will eventually be turned off.