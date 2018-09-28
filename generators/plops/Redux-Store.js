const fs = require('fs');
module.exports = plop => {
   plop.setGenerator('redux-store', {
      description: 'Add a redux store, with constant, action and reducer case',
      prompts: [
         {
            type: 'input',
            name: 'container',
            message: 'Name of the store'
         }
      ],
      actions: data => {
         const actions = [
            {
               type: 'add',
               path: 'src/store/{{properCase container}}/actions.js',
               templateFile:
                  'generators/templates/redux-store/ActionsFileTemplate.hbs'
            },
            {
               type: 'add',
               path: 'src/store/{{properCase container}}/constants.js',
               templateFile:
                  'generators/templates/redux-store/ConstantsFileTemplate.hbs'
            },
            {
               type: 'add',
               path: 'src/store/{{properCase container}}/reducer.js',
               templateFile:
                  'generators/templates/redux-store/ReducerFileTemplate.hbs'
            },
            {
               type: 'add',
               path: 'src/store/{{properCase container}}/selectors.js',
               templateFile:
                  'generators/templates/redux-store/SelectorsFileTemplate.hbs'
            },
            {
               type: 'append',
               path: 'src/rootReducer.js',
               template: `import {{properCase container}}Reducer from './../store/{{properCase container}}/reducer';`,
               pattern: /import.*combineReducers.*redux.*\n/
            },
            {
               type: 'append',
               path: 'src/rootReducer.js',
               template: `{{camelCase container}}: reducer,`,
               pattern: /export.*combineReducers.*\n/
            }
         ];

         actions.push({
            type: 'prettify',
            path: 'src'
         });
         actions.push({
            type: 'prettify',
            path: 'src/store/' + data.container
         });
         return actions;
      }
   });
};
