//stack
export const stackSchema = {
    name: 'stack',
    title: 'Stack',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Stack Name',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      // Add more fields related to stack information if needed
      // ...
    ],
  };