const fs = require('fs');
module.exports = plop => {
   plop.setGenerator('action', {
      description:
         'Add a constant, action and reducer case to a container component',
      prompts: [
         {
            type: 'list',
            name: 'container',
            message: 'Name of the container',
            choices: fs.readdirSync('src/containers')
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
               path: 'src/containers/{{container}}/constants.js',
               pattern: /$/,
               template:
                  'export const {{constantCase container}}_{{constantCase action}} = "@{{container}} {{ titleCase action }}"'
            },
            {
               type: 'append',
               path: 'src/containers/{{container}}/actions.js',
               pattern: /$/,
               templateFile: 'generators/templates/action/ActionTemplate.hbs'
            },
            {
               type: 'modify',
               path: 'src/containers/{{container}}/reducer.js',
               pattern: /default:/g,
               templateFile:
                  'generators/templates/action/ActionReducerTemplate.hbs'
            }
         ];

         actions.push({
            type: 'prettify',
            path: 'src/containers/' + data.container
         });
         return actions;
      }
   });
};
