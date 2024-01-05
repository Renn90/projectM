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
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'lastname',
        title: 'lastname',
        type: 'string',
        validation: (Rule) => Rule.required(),
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
      },
      {
        name: 'projects',
        title: 'Projects',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'project',
                title: 'Project',
                type: 'reference',
                to: [{ type: 'project' }],
              },
              {
                name: 'role',
                title: 'Role',
                type: 'string', // You can define roles like 'owner', 'member', etc.
              },
            ],
          },
        ],
      },
    ],
  };
  