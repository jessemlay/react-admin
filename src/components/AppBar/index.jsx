import React from 'react';
import { AppBar, UserMenu, MenuItemLink, translate } from 'react-admin';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const CustomUserMenu = translate(({ translate, ...props }) => (
  <UserMenu {...props}>
    <MenuItemLink
      to="/settings"
      primaryText={translate('pos.settings')}
      leftIcon={<SettingsIcon />}
    />
    <MenuItemLink
      to="/login"
      primaryText={translate('pos.logout')}
      leftIcon={<PowerSettingsNewIcon />}
    />
  </UserMenu>
));

const CustomAppBar = props => (
  <AppBar {...props} userMenu={<CustomUserMenu />} />
);

export default CustomAppBar;
