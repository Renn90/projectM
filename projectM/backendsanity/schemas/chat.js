 // chat.js
 export const chatSchema = {
    name: 'chat',
    title: 'Chat',
    type: 'document',
    fields: [
      {
        name: 'project',
        title: 'Project',
        type: 'reference',
        to: [{ type: 'project' }],
      },
      {
        name: 'messages',
        title: 'Messages',
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
                name: 'text',
                title: 'Text',
                type: 'text',
              },
              {
                name: 'timestamp',
                title: 'Timestamp',
                type: 'datetime',
              },
            ],
          },
        ],
      },
    ],
  };
  