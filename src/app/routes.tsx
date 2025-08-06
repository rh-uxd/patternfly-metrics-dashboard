import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from '@app/Dashboard/Dashboard';
import { Components } from '@app/Components/Components';
import { Search } from '@app/Search/Search';
import { Products } from '@app/Products/Products';
import { Web } from '@app/Web/Web';
import { Teams } from '@app/Teams/Teams';
import { NotFound } from '@app/NotFound/NotFound';

export interface IAppRoute {
  label?: string; // Excluding the label will exclude the route from the nav sidebar in AppLayout
  /* eslint-disable @typescript-eslint/no-explicit-any */
  element: React.ReactElement;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  exact?: boolean;
  path: string;
  title: string;
  routes?: undefined;
}

export interface IAppRouteGroup {
  label: string;
  routes: IAppRoute[];
}

export type AppRouteConfig = IAppRoute | IAppRouteGroup;

const routes: AppRouteConfig[] = [
  {
    element: <Dashboard />,
    exact: true,
    label: 'Dashboard',
    path: '/',
    title: 'PatternFly Metrics | Dashboard Home',
  },
  {
    element: <Components />,
    exact: true,
    label: 'Component Metrics',
    path: '/components',
    title: 'PatternFly Metrics | Component Metrics',
  },
  {
    element: <Products />,
    exact: true,
    label: 'Product Metrics',
    path: '/products',
    title: 'PatternFly Metrics | Product Metrics',
  },
  {
    element: <Search />,
    exact: true,
    label: 'Search Metrics',
    path: '/search',
    title: 'PatternFly Metrics | Search Metrics',
  },
  {
    element: <Web />,
    exact: true,
    label: 'Web Metrics',
    path: '/web',
    title: 'PatternFly Metrics | Web Metrics',
  },
  {
    element: <Teams />,
    exact: true,
    label: 'Team Metrics',
    path: '/teams',
    title: 'PatternFly Metrics | Team Metrics',
  },
];

const flattenedRoutes: IAppRoute[] = routes.reduce(
  (flattened, route) => [...flattened, ...(route.routes ? route.routes : [route])],
  [] as IAppRoute[],
);

const AppRoutes = (): React.ReactElement => (
  <Routes>
    {flattenedRoutes.map(({ path, element }, idx) => (
      <Route path={path} element={element} key={idx} />
    ))}
    <Route element={<NotFound />} />
  </Routes>
);

export { AppRoutes, routes };
