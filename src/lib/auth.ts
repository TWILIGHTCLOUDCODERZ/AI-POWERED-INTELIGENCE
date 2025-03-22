import { 
  Configuration, 
  PublicClientApplication,
  RedirectRequest,
  AccountInfo,
  InteractionRequiredAuthError,
  BrowserAuthError
} from '@azure/msal-browser';
import { config } from './config';

// MSAL configuration
const msalConfig: Configuration = {
  auth: {
    clientId: config.azure.b2c.clientId,
    authority: config.azure.b2c.authority,
    knownAuthorities: [config.azure.b2c.knownAuthority],
    redirectUri: config.azure.b2c.redirectUri,
    postLogoutRedirectUri: config.azure.b2c.redirectUri,
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    allowRedirectInIframe: true,
    loggerOptions: {
      logLevel: 3, // Error = 0, Warning = 1, Info = 2, Verbose = 3
      loggerCallback: (level: number, message: string, containsPii: boolean) => {
        if (containsPii) return;
        switch (level) {
          case 0: console.error(message); break;
          case 1: console.warn(message); break;
          case 2: console.info(message); break;
          case 3: console.debug(message); break;
        }
      }
    }
  }
};

// Initialize MSAL instance
export const msalInstance = new PublicClientApplication(msalConfig);

// Login request configuration
export const loginRequest: RedirectRequest = {
  scopes: ['openid', 'profile', 'offline_access'],
  prompt: 'select_account',
};

// Authentication service
class AuthService {
  private static instance: AuthService;
  private currentAccount: AccountInfo | null = null;
  private initialized: boolean = false;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      await msalInstance.initialize();
      await this.handleRedirectPromise();
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize AuthService:', error);
      throw error;
    }
  }

  public async login(): Promise<void> {
    try {
      if (!this.initialized) await this.initialize();
      
      await msalInstance.loginRedirect({
        ...loginRequest,
        authority: config.azure.b2c.authority,
        redirectUri: config.azure.b2c.redirectUri,
      });
    } catch (error) {
      console.error('Login error:', error);
      this.handleError(error);
    }
  }

  public async logout(): Promise<void> {
    try {
      if (!this.initialized) await this.initialize();
      const account = msalInstance.getActiveAccount();
      if (account) {
        await msalInstance.logoutRedirect({
          account,
          postLogoutRedirectUri: config.azure.b2c.redirectUri,
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
      this.handleError(error);
    }
  }

  public async handleRedirectPromise(): Promise<void> {
    try {
      const response = await msalInstance.handleRedirectPromise();
      if (response) {
        this.currentAccount = response.account;
        msalInstance.setActiveAccount(this.currentAccount);
      } else {
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length > 0) {
          this.currentAccount = accounts[0];
          msalInstance.setActiveAccount(this.currentAccount);
        }
      }
    } catch (error) {
      console.error('Redirect handling error:', error);
      this.handleError(error);
    }
  }

  public getCurrentAccount(): AccountInfo | null {
    return msalInstance.getActiveAccount();
  }

  public isAuthenticated(): boolean {
    return msalInstance.getActiveAccount() !== null;
  }

  private handleError(error: any): void {
    if (error instanceof InteractionRequiredAuthError) {
      this.login();
    } else if (error instanceof BrowserAuthError) {
      console.error('Browser authentication error:', error.message);
    } else {
      console.error('Authentication error:', error);
    }
  }
}

// Export singleton instance
export const authService = AuthService.getInstance();

// Initialize auth service
authService.initialize().catch(error => {
  console.error('Failed to initialize auth service:', error);
});