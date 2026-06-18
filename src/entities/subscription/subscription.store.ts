import { create } from 'zustand';
import {
  Subscription,
  SubscriptionPlan,
  TenantFeatureFlag,
  TenantLimit,
  Invoice,
} from './subscription.types';

type SubscriptionDetails = {
  subscription: Subscription;
  plan: SubscriptionPlan;
  scheduled_plan: SubscriptionPlan | null;
  feature_flags: TenantFeatureFlag[];
  limits: TenantLimit[];
  invoice: Invoice;
};

type SubscriptionStore = {
  subscription: Subscription | null;
  plan: SubscriptionPlan | null;
  scheduledPlan: SubscriptionPlan | null;
  featureFlags: TenantFeatureFlag[];
  limits: TenantLimit[];
  invoice: Invoice | null;
  loading: boolean;
  error: any | null;
  setSubscriptionDetails: (details: SubscriptionDetails | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: any | null) => void;
  clearSubscription: () => void;
};

export const useSubscriptionStore = create<SubscriptionStore>((set) => ({
  subscription: null,
  plan: null,
  scheduledPlan: null,
  featureFlags: [],
  limits: [],
  invoice: null,
  loading: false,
  error: null,
  setSubscriptionDetails: (details) =>
    set({
      subscription: details?.subscription ?? null,
      plan: details?.plan ?? null,
      scheduledPlan: details?.scheduled_plan ?? null,
      featureFlags: details?.feature_flags ?? [],
      limits: details?.limits ?? [],
      invoice: details?.invoice ?? null,
      loading: false,
      error: null,
    }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error, loading: false }),
  clearSubscription: () =>
    set({
      subscription: null,
      plan: null,
      scheduledPlan: null,
      featureFlags: [],
      limits: [],
      invoice: null,
      loading: false,
      error: null,
    }),
}));

