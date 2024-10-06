import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './views/App';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import NotFound from './views/NotFound';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/dashboard',
        element: <Dashboard />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

const Routes = () => {
    return <RouterProvider router={router} />;
};

export default Routes;