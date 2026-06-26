import { z } from 'zod';

const baseMetadataSchema = z.object({
  id: z.string(),
  tenant_id: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  deleted: z.date().nullable(),
});

export const RoleSchema = baseMetadataSchema.extend({
  name: z.string().min(1),
});

export const RolePermissionSchema = baseMetadataSchema.extend({
  role_id: z.string(),
  permission_id: z.string(),
});

export type Role = z.infer<typeof RoleSchema>;
export type RolePermission = z.infer<typeof RolePermissionSchema>;
