import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Collection from '../pages/Collection';
import ProductDetail from '../pages/ProductDetail';
import Wishlist from '../pages/Wishlist';
import PageTransition from '../components/PageTransition';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: (
          <PageTransition>
            <Home />
          </PageTransition>
        ),
      },
      {
        path: 'collection/:handle',
        element: (
          <PageTransition>
            <Collection />
          </PageTransition>
        ),
      },
      {
        path: 'product/:handle',
        element: (
          <PageTransition>
            <ProductDetail />
          </PageTransition>
        ),
      },
      {
        path: 'wishlist',
        element: (
          <PageTransition>
            <Wishlist />
          </PageTransition>
        ),
      },
    ],
  },
]);
export default router;
