import { z } from 'zod';
import { OnboardingSchema } from './onboarding.contracts';

export type TOnboarding = z.infer<typeof OnboardingSchema>;
