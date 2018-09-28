const componentExists = require('../utils/componentExists');

module.exports = plop => {
   plop.setGenerator('container', {
      description: 'Add a container component',
      prompts: [
         {
            type: 'list',
            name: 'type',
            message: 'Select the base component type:',
            default: 'Stateless Function',
            choices: () => [
               'Stateless Function',
               'React.PureComponent',
               'React.Component'
            ]
         },
         {
            type: 'input',
            name: 'name',
            message: 'What should it be called?',
            validate: value => {
               if (/.+/.test(value)) {
                  return componentExists(value)
                     ? 'A component or container with this name already exists'
                     : true;
               }

               return 'The name is required';
            }
         },
         {
            type: 'confirm',
            name: 'wantActionsAndReducer',
            default: true,
            message:
               'Do you want an actions/constants/selectors/reducer for this container?'
         },
         {
            type: 'confirm',
            name: 'wantMessages',
            default: true,
            message:
               'Do you want i18n messages (i.e. will this component use text)?'
         },
         {
            type: 'confirm',
            name: 'wantLoadable',
            default: true,
            message: 'Do you want to load resources asynchronously?'
         }
      ],
      actions: data => {
         // Generate index.js and index.test.js
         var componentTemplate; // eslint-disable-line no-var

         switch (data.type) {
            case 'Stateless Function': {
               componentTemplate =
                  'generators/templates/container/stateless.js.hbs';
               break;
            }
            default: {
               componentTemplate =
                  'generators/templates/container/class.js.hbs';
            }
         }

         const actions = [
            {
               type: 'add',
               path: 'src/containers/{{properCase name}}/index.jsx',
               templateFile: componentTemplate,
               abortOnFail: true
            },
            {
               type: 'add',
               path: 'src/containers/{{properCase name}}/tests/index.test.js',
               templateFile: 'generators/templates/container/test.js.hbs',
               abortOnFail: true
            }
         ];

         // If component wants messages
         if (data.wantMessages) {
            actions.push({
               type: 'add',
               path: 'src/containers/{{properCase name}}/messages.js',
               templateFile: 'generators/templates/container/messages.js.hbs',
               abortOnFail: true
            });
         }

         // If they want actions and a reducer, generate actions.js, constants.js,
         // reducer.js and the corresponding tests for actions and the reducer
         if (data.wantActionsAndReducer) {
            // Actions
            actions.push({
               type: 'add',
               path: 'src/containers/{{properCase name}}/actions.js',
               templateFile: 'generators/templates/container/actions.js.hbs',
               abortOnFail: true
            });

            // Constants
            actions.push({
               type: 'add',
               path: 'src/containers/{{properCase name}}/constants.js',
               templateFile: 'generators/templates/container/constants.js.hbs',
               abortOnFail: true
            });

            // Selectors
            actions.push({
               type: 'add',
               path: 'src/containers/{{properCase name}}/selectors.js',
               templateFile: 'generators/templates/container/selectors.js.hbs',
               abortOnFail: true
            });

            // Reducer
            actions.push({
               type: 'add',
               path: 'src/containers/{{properCase name}}/reducer.js',
               templateFile: 'generators/templates/container/reducer.js.hbs',
               abortOnFail: true
            });
         }

         if (data.wantLoadable) {
            actions.push({
               type: 'add',
               path: 'src/containers/{{properCase name}}/Loadable.js',
               templateFile: 'generators/templates/container/loadable.js.hbs',
               abortOnFail: true
            });
         }

         if (data.wantActionsAndReducer === true) {
            actions.push({
               type: 'append',
               path: 'src/rootReducer.js',
               template: `import {{camelCase name}}Reducer from '../containers/{{properCase name}}/reducer';`,
               pattern: /import.*combineReducers.*redux.*\n/
            });

            actions.push({
               type: 'append',
               path: 'src/rootReducer.js',
               template: `{{camelCase name}}: {{camelCase name}}Reducer,`,
               pattern: /export.*combineReducers.*\n/
            });
         }

         actions.push({
            type: 'prettify',
            path: 'src'
         });

         return actions;
      }
   });
};
