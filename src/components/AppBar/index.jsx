import React from 'react';
import { AppBar, UserMenu, MenuItemLink, translate } from 'react-admin';
import SettingsIcon from '@material-ui/icons/Settings';

const CustomUserMenu = translate(({ translate, ...props }) => (
   <UserMenu {...props}>
      <MenuItemLink
         to="/settings"
         primaryText={translate('pos.settings')}
         leftIcon={<SettingsIcon />}
      />
   </UserMenu>
));

const CustomAppBar = props => (
   <AppBar {...props} userMenu={<CustomUserMenu />} />
);

export default CustomAppBar;
