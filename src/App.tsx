import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { router } from './routes';

export const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
      <SpeedInsights />
    </>
  );
};

export default App;
