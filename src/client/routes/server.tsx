import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/home';
import HashTags from '../pages/hashTags';
const route: any[] = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/hashtag',
    exact: true,
    component: HashTags,
  },
];
const Routers = () => {
  return (
    <Switch>
      {route.map(r => {
        const { path, exact, component } = r;
        const pathStr: any = path;
        const LazyDom: any = component;
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
  );
};
export default Routers;
