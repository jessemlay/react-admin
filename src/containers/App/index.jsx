// in src/App.js
import React from 'react';
import { Admin, Resource, fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { PostList, PostEdit, PostCreate } from '../../posts';
import { UserList } from '../../users';
import themeReducer from '../../themeReducer';
import customRoutes from '../../routes';
import Layout from '../Layout';
import Dashboard from '../Dashboard';
import Login from '../Login';
import authProvider from '../../authProvider';

// localization
import englishMessages from '../../i18n/en';
const i18nProvider = locale => {
   if (locale === 'es') {
      return import('../../i18n/es').then(messages => messages.default);
   }

   // Always fallback on english
   return englishMessages;
};

//setup dataProvider
const httpClient = (url, options = {}) => {
   if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
   }
   const token = localStorage.getItem('token');
   options.headers.set('Authorization', `Bearer ${token}`);
   return fetchUtils.fetchJson(url, options);
};
const dataProvider = jsonServerProvider(process.env.REACT_APP_API, httpClient);

const App = () => (
   <Admin
      title={process.env.REACT_APP_NAME}
      dataProvider={dataProvider}
      authProvider={authProvider}
      customReducers={{ theme: themeReducer }}
      customRoutes={customRoutes}
      appLayout={Layout}
      loginPage={Login}
      dashboard={Dashboard}
      locale="es"
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
