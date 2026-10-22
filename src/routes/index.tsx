import { createBrowserRouter, Link } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';

// Public Pages
import { Home } from '../pages/Home';
import { Projects } from '../pages/Projects';
import { ProjectDetail } from '../pages/ProjectDetail';
import { Achievements } from '../pages/Achievements';
import { About } from '../pages/About';
import { Contact } from '../pages/Contact';

// 404 Page
const NotFoundPage = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
    <div className="p-4 bg-accent text-accent-foreground border-3 border-border shadow-brutal font-mono text-4xl font-black">
      404
    </div>
    <h1 className="text-3xl font-black font-sans uppercase tracking-tight text-foreground">
      ROUTE MANIFEST NOT FOUND
    </h1>
    <p className="font-mono text-sm text-muted-foreground max-w-md">
      The requested URL does not match any registered public endpoint.
    </p>
    <div className="pt-2">
      <Link
        to="/"
        className="inline-block px-5 py-2.5 bg-foreground text-surface font-mono text-xs font-bold uppercase border-2 border-border shadow-brutal hover:shadow-brutal-sm transition-all"
      >
        RETURN TO SYSTEM ROOT
      </Link>
    </div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'projects', element: <Projects /> },
      { path: 'projects/:slug', element: <ProjectDetail /> },
      { path: 'achievements', element: <Achievements /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
