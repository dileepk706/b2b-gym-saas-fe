import z from 'zod';
import { StaffSearchDtoSchema } from './api.contracts';

export type StaffSearchDto = z.infer<typeof StaffSearchDtoSchema>;
