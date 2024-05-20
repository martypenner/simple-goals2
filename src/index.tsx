import { Goals } from '@/components/goals';
import * as Sentry from '@sentry/react';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
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

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

function App() {
  // const initialized = useInitialized(r);
  //
  // if (!initialized) {
  //   return <div className="mt-48 mx-auto">Setting things up...</div>;
  // }

  return <Goals />;
}

const rootElement = document.getElementById('root');
if (rootElement === null) {
  throw new Error('root element is null');
}
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <App />
    </ConvexProvider>
  </React.StrictMode>,
);
