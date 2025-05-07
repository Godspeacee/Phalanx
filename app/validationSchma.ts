import { z } from "zod";

export const createIssueSchma = z.object({
  title: z.string().min(1, {message:'Title must be at leat 1 character(s) long'}).max(255),
  description: z.string().min(1),
});
