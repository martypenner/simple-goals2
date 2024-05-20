import { Goals } from '@/components/goals';
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  UserButton,
  useAuth,
} from '@clerk/clerk-react';
import * as Sentry from '@sentry/react';
import {
  Authenticated,
  ConvexReactClient,
  Unauthenticated,
} from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';

Sentry.init({
  dsn: 'https://0d68d0e6adb64123949409263a98be20@o4506871392632832.ingest.us.sentry.io/4507172546019328',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', /^https:\/\/simple-goals\.pages\.dev/],
  // Session Replay
  replaysSessionSampleRate: 1.0, // 100% sample rate
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

function App() {
  // const initialized = useInitialized(r);
  //
  // if (!initialized) {
  //   return <div className="mt-48 mx-auto">Setting things up...</div>;
  // }

  return (
    <>
      <header>
        <Unauthenticated>
          <RedirectToSignIn />
        </Unauthenticated>
        <Authenticated>
          <nav className="w-100 text-end py-2 px-6 flex items-center justify-end whitespace-nowrap rounded-md">
            <UserButton />
          </nav>
        </Authenticated>
      </header>

      <SignedIn>
        <Goals />
      </SignedIn>
    </>
  );
}

const rootElement = document.getElementById('root');
if (rootElement === null) {
  throw new Error('root element is null');
}
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <App />
      </ConvexProviderWithClerk>
    </ClerkProvider>
  </React.StrictMode>,
);
