import { z } from "zod";

export const becomeOrganizerSchema = z.object({
  organizationName: z.string().min(3),
  organizationDesc: z.string().min(10),
  organizationAddr: z.string().min(5),
  organizationPhone: z.string().min(7),
});
