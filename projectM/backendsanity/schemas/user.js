// user.js
export const userSchema = {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      {
        name: 'firstname',
        title: 'firstname',
        type: 'string',
        validation: (Rule) =>
        Rule.required().min(2).max(20).warning('The name must be between 2 and 20 characters.'),
      },
      {
        name: 'lastname',
        title: 'lastname',
        type: 'string',
        validation: (Rule) =>
        Rule.required().min(2).max(20).warning('The name must be between 2 and 20 characters.'),
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'nickname',
        title: 'Nickname',
        type: 'string',
        validation: (Rule) =>
        Rule.min(2).max(15).warning('The name must be between 2 and 20 characters.'),
      },
      {
        name: 'job',
        title: 'Job Title',
        type: 'string',
        validation: (Rule) =>
        Rule.min(2).max(25).warning('The name must be between 2 and 20 characters.'),
      },
      {
        name: 'gitLink',
        title: 'Git',
        type: 'url',
      },
      {
        name: 'portfolioLink',
        title: 'Portfolio',
        type: 'url',
      },
      {
        name: 'stack',
        title: 'Stack',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'name', type: 'string' },
              { name: 'category', type: 'string' }
            ]
          }
        ]
      }
      // {
      //   name: 'projects',
      //   title: 'Projects',
      //   type: 'array',
      //   of: [
      //     {
      //       type: 'object',
      //       fields: [
      //         {
      //           name: 'project',
      //           title: 'Project',
      //           type: 'reference',
      //           to: [{ type: 'project' }],
      //         },
      //         {
      //           name: 'role',
      //           title: 'Role',
      //           type: 'string', // You can define roles like 'owner', 'member', etc.
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
  };
  