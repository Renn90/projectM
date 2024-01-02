// Import your individual schema files
import { userSchema } from './user';
import { projectSchema } from './project';
import { chatSchema } from './chat';
import { stackSchema } from './stack';


export const schemaTypes = [userSchema, projectSchema, chatSchema, stackSchema]
