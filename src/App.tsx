import React, { useState, useEffect } from 'react';
import { Chat } from './components/Chat';
import { Help } from './components/help/Help';
import { SignInButton } from './components/auth/SignInButton';
import { Cloud, HelpCircle } from 'lucide-react';
import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { msalInstance, authService } from './lib/auth';
import { Background } from './components/Background';
import { CustomCursor } from './components/CustomCursor';

function WelcomePage({ onSkipSignIn }: { onSkipSignIn: () => void }) {
  useEffect(() => {
    if (authService.isAuthenticated()) {
      onSkipSignIn();
    }
  }, [onSkipSignIn]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="max-w-md w-full p-6 sm:p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-purple-100 hover-glow">
        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text mb-4">
          Welcome to AI Architecture Assistant
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Sign in to save your designs or continue without signing in.
        </p>
        <div className="space-y-3">
          <SignInButton onSignInSuccess={onSkipSignIn} />
          <button
            onClick={onSkipSignIn}
            className="w-full px-4 py-2.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 border border-gray-200 hover:border-purple-200"
          >
            <span className="font-medium">Continue without signing in</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [skipAuth, setSkipAuth] = useState(false);

  useEffect(() => {
    authService.handleRedirectPromise()
      .then(() => {
        if (authService.isAuthenticated()) {
          setSkipAuth(true);
        }
      })
      .catch(error => {
        console.error('Error during redirect:', error);
      });
  }, []);

  return (
    <MsalProvider instance={msalInstance}>
      <CustomCursor />
      <Background />
      <div className="min-h-screen relative">
        <header className="bg-white/70 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
          <div className="max-w-[1920px] mx-auto px-4 lg:px-8 py-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 group hover-lift">
                <div className="p-2.5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-500 group-hover:scale-110">
                  <Cloud className="text-white w-6 h-6 animate-pulse-slow" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
                    AI Architecture Assistant
                  </h1>
                  <p className="text-xs text-gray-600 mt-0.5 group-hover:text-purple-600 transition-colors">
                    Design scalable cloud architectures with AI
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <SignInButton onSignInSuccess={() => setSkipAuth(true)} />
                <button
                  onClick={() => setIsHelpOpen(true)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-purple-50 rounded-lg transition-all duration-300 border border-gray-200 hover:border-purple-200 shadow-sm hover:shadow-md hover-lift"
                >
                  <HelpCircle size={16} />
                  <span className="font-medium text-sm">Help</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-[1920px] mx-auto px-4 lg:px-8 py-4">
          <AuthenticatedTemplate>
            <Chat />
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            {skipAuth ? (
              <Chat />
            ) : (
              <WelcomePage onSkipSignIn={() => setSkipAuth(true)} />
            )}
          </UnauthenticatedTemplate>
        </main>
        <Help isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      </div>
    </MsalProvider>
  );
}

export default App;