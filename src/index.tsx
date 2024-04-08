import { Goals } from '@/components/goals';
import { nanoid } from 'nanoid';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { r } from './reflect';

import './globals.css';

r.mutate.addGoal({
  id: nanoid(),
  progress: 30,
  title: 'Write a novel',
  description: `I've always had a story to tell, and now I'm finally putting it on paper.`,
  createdAt: new Date('March 23, 2024').valueOf(),
  updatedAt: new Date('March 23, 2024').valueOf(),
  endDate: new Date('March 23, 2025').valueOf(),
});
r.mutate.addGoal({
  id: nanoid(),
  progress: 30,
  title: 'Write a poem',
  description: `I've always had a story to tell, and now I'm finally putting it on paper.`,
  createdAt: new Date('March 23, 2024').valueOf(),
  updatedAt: new Date('March 23, 2024').valueOf(),
  completedAt: new Date('June 12, 2024').valueOf(),
  endDate: new Date('March 23, 2025').valueOf(),
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
