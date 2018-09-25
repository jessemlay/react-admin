const path = require('path');
const { exec } = require('child_process');

const ComponentPlop = require('./generators/plops/ComponentPlop');
const ReduxStore = require('./generators/plops/Redux-Store');
const ReduxAction = require('./generators/plops/Redux-Action');
const ActionPlop = require('./generators/plops/ActionPlop');
const ContainerPlop = require('./generators/plops/ContainerPlop');

module.exports = plop => {
   ContainerPlop(plop);
   ComponentPlop(plop);
   ActionPlop(plop);
   ReduxStore(plop);
   ReduxAction(plop);

   plop.setActionType('prettify', (answers, config, plop) => {
      const folderPath = `${path.join(config.path, '**.js')}`;
      exec(`npm run prettify -- "${folderPath}"`);
      return folderPath;
   });
};
