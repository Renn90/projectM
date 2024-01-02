  // project.js
  export const projectSchema = {
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Project Name',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'description',
        title: 'Project Description',
        type: 'text',
      },
      {
        name: 'members',
        title: 'Members',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'user',
                title: 'User',
                type: 'reference',
                to: [{ type: 'user' }],
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
      {
        name: 'chat',
        title: 'Chat',
        type: 'reference',
        to: [{ type: 'chat' }],
      },
    ],
  };
  