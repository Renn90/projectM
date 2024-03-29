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
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'git',
        title: 'Git link',
        type: 'url',
      },
      {
        name: 'liveLink',
        title: 'Live link',
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
             { name: 'stackName',
              title: 'Stack Name',
              type: 'string',
            },
              {
                name: 'cartegory',
                type: 'string'
              },
              {
                name: 'key',
                type: 'string'
              }
            ],
          },
        ],
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
                    type: 'string',
                  },
            ],
          }
        ],
      }
    ]
  }      
  