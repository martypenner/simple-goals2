import { Goals } from '@/components/goals';
import { Reflect } from '@rocicorp/reflect/client';
import { nanoid } from 'nanoid';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { mutators } from './mutators';

import './globals.css';

const userID = nanoid();
const roomID = 'my-room';

const server: string | undefined = import.meta.env.VITE_REFLECT_URL;
if (!server) {
  throw new Error('VITE_REFLECT_URL required');
}

const r = new Reflect({
  server,
  userID,
  roomID,
  auth: userID,
  mutators,
});

function App() {
  return <Goals />;
}

const rootElement = document.getElementById('root');
if (rootElement === null) {
  throw new Error('root element is null');
}
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

if (import.meta.hot) {
  import.meta.hot.dispose(async () => {
    // this makes sure that there is only one instance of the reflect client during hmr reloads
    await r.close();
    root.unmount();
  });
}
