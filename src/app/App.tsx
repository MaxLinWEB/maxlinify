import { RouterProvider } from 'react-router';
import { router } from './routes';

export default function App() {
  return (
    <div className="w-full min-h-screen bg-black sm:bg-zinc-950 flex items-center justify-center text-white p-0 sm:p-8">
      <RouterProvider router={router} />
    </div>
  );
}
