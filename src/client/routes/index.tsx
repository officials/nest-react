import React from 'react';
import { Route, RouteProps, Switch } from 'react-router-dom';
const { Suspense, lazy } = React;
// import Spin from 'antd/es/spin';

const Home = lazy(function() {
  return import(/* webpackChunkName:'home'*/ '../pages/home');
});
const HashTag = lazy(() =>
  import(/* webpackChunkName:'hashtags' */ '../pages/hashTags'),
);
const routes: RouteProps[] = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/hashTag',
    exact: true,
    component: HashTag,
  },
];

const Routers = () => {
  return (
    <Suspense fallback={<p>loading</p>}>
      <Switch>
        {routes.map(r => {
          const { path, exact, component } = r;
          const pathStr: any = path;
          const LazyDom: any = component;
          console.log(LazyDom);
          return (
            <Route
              path={path}
              exact={exact}
              key={pathStr}
              render={() => <LazyDom />}
            />
          );
        })}
      </Switch>
    </Suspense>
  );
};
export default Routers;
