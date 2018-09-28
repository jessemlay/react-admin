import React from 'react';
import { List, Datagrid, EmailField, TextField } from 'react-admin';

export const UserList = props => (
   <List {...props}>
      <Datagrid>
         <TextField source="id" />
         <TextField source="name" />
         <TextField source="username" />
         <EmailField source="email" />
      </Datagrid>
   </List>
);
