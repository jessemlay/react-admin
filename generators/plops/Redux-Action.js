const fs = require('fs');
module.exports = plop => {
   plop.setGenerator('redux-action', {
      description: 'Add a constant, action and reducer case to a redux store',
      prompts: [
         {
            type: 'list',
            name: 'container',
            message: 'Name of the container',
            choices: fs.readdirSync('src/store')
         },
         {
            type: 'input',
            name: 'action',
            message: 'Name of the action'
         }
      ],
      actions: data => {
         const actions = [
            {
               type: 'append',
               path: 'src/store/{{container}}/constants.js',
               pattern: /$/,
               template:
                  'export const {{constantCase container}}_{{constantCase action}} = "@{{container}} {{ titleCase action }}"'
            },
            {
               type: 'append',
               path: 'src/store/{{container}}/actions.js',
               pattern: /$/,
               templateFile:
                  'generators/templates/redux-action/ActionTemplate.hbs'
            },
            {
               type: 'modify',
               path: 'src/store/{{container}}/reducer.js',
               pattern: /default:/g,
               templateFile:
                  'generators/templates/redux-action/ActionReducerTemplate.hbs'
            }
         ];

         actions.push({
            type: 'prettify',
            path: 'src/store/' + data.container
         });
         return actions;
      }
   });
};
