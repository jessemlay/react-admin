// in src/App.js
import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { PostList, PostEdit, PostCreate } from './posts';
import { UserList } from './users';
import themeReducer from './themeReducer';
import customRoutes from './routes';
import Layout from './Layout';
import Dashboard from './containers/Dashboard';
import Login from './Login';

// localization
import englishMessages from './i18n/en';
const i18nProvider = locale => {
  if (locale === 'es') {
    return import('./i18n/es').then(messages => messages.default);
  }

  // Always fallback on english
  return englishMessages;
};

const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
const App = () => (
  <Admin
    title={process.env.REACT_APP_NAME}
    dataProvider={dataProvider}
    customReducers={{ theme: themeReducer }}
    customRoutes={customRoutes}
    appLayout={Layout}
    loginPage={Login}
    dashboard={Dashboard}
    locale="en"
    i18nProvider={i18nProvider}
  >
    <Resource
      name="posts"
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
    />
    <Resource name="users" list={UserList} />
  </Admin>
);

export default App;
