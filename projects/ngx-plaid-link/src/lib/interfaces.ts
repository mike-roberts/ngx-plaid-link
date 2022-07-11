export interface PlaidSuccessMetadata {
  link_session_id: string;
  institution?: PlaidInstitutionObject;
  account: PlaidAccountObject;
  accounts: Array<PlaidAccountObject>;
  account_id: string;
  public_token: string;
  transfer_status?: 'COMPLETE' | 'INCOMPLETE';
}

export interface PlaidOnSuccessArgs {
  token: string;
  metadata: PlaidSuccessMetadata;
}

export interface PlaidInstitutionObject {
  name: string;
  institution_id: string;
}

export interface PlaidAccountObject {
  id: string;
  name: string;
  mask?: string;
  type: string;
  subtype: string;
  verification_status?: string;
}

export interface PlaidErrorObject {
  display_message: string;
  error_code: string;
  error_message: string;
  error_type: string;
}

export interface PlaidErrorMetadata {
  link_session_id: string;
  institution: PlaidInstitutionObject;
  status: string;
}

export interface PlaidOnExitArgs {
  error: PlaidErrorObject;
  metadata: PlaidErrorMetadata;
}

export interface PlaidOnEventArgs {
  eventName: string;
  metadata: PlaidEventMetadata;
}

export interface PlaidEventMetadata {
  error_code: string;
  error_message: string;
  error_type: string;
  exit_status: string;
  institution_id: string;
  institution_name: string;
  institution_search_query: string;
  request_id: string;
  link_session_id: string;
  mfa_type: string;
  view_name: string;
  timestamp: string;
}

export interface PlaidConfig {
  apiVersion?: string;
  clientName?: string;
  env: string;
  key?: string;
  onLoad?: Function;
  onSuccess: Function;
  onExit: Function;
  onEvent?: Function;
  product: Array<string>;
  selectAccount?: boolean;
  token?: string;
  webhook?: string;
  countryCodes?: string[];
  receivedRedirectUri?: string;
  isWebview?: boolean;
}

export interface PlaidExitArgs {
  force?: boolean;
}
