import { z } from "zod";

export const issueSchma = z.object({
  title: z.string().min(1, {message:'Title must be at leat 1 character(s) long'}).max(255),
  description: z.string().min(1).max(65535 ),
  
});
export const patchIssueSchma = z.object({
  title: z.string().min(1, {message:'Title must be at leat 1 character(s) long'}).max(255).optional(),
  description: z.string().min(1,{message:'AssignedToUserId is required'}).max(65535).optional(),
  status:z.enum(['OPEN','IN PROGRESS','CLOSED']).optional(),
  assignedToUserId:z.string().min(1).max(255).optional().nullable()
});
