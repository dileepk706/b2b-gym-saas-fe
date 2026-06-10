import { z } from 'zod';
import { TenantSchema } from './tenant.contracts';

export type Tenant = z.infer<typeof TenantSchema>;
