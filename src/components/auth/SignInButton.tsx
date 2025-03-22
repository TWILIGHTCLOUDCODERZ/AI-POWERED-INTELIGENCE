import React from 'react';
import { useMsal } from '@azure/msal-react';
import { LogIn, LogOut, Loader2 } from 'lucide-react';
import { authService } from '../../lib/auth';

interface SignInButtonProps {
  onSignInSuccess?: () => void;
}

export function SignInButton({ onSignInSuccess }: SignInButtonProps) {
  const { accounts, inProgress } = useMsal();
  const isAuthenticated = accounts.length > 0;
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await authService.login();
      onSignInSuccess?.();
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    const currentAccount = accounts[0];
    return (
      <div className="flex items-center gap-2">
        <div className="px-4 py-2 text-sm text-gray-600">
          Welcome, {currentAccount.name}
        </div>
        <button
          onClick={handleLogout}
          disabled={isLoading || inProgress !== 'none'}
          className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:bg-red-50 rounded-xl transition-all duration-300 border border-gray-200 hover:border-red-200 shadow-sm hover:text-red-600 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <LogOut size={18} className="group-hover:text-red-500" />
          )}
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      disabled={isLoading || inProgress !== 'none'}
      className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:bg-blue-50 rounded-xl transition-all duration-300 border border-gray-200 hover:border-blue-200 shadow-sm hover:text-blue-600 group disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <LogIn size={18} className="group-hover:text-blue-500" />
      )}
      <span className="font-medium">Sign In</span>
    </button>
  );
}