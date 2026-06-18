import { create } from 'zustand';
import { Tenant } from './tenant.type';

type TenantStore = {
  currentTenant: Tenant | null;
  loading: boolean;
  setCurrentTenant: (tenant: Tenant | null) => void;
  setLoading: (loading: boolean) => void;
  clearTenantContext: () => void;
};

export const useTenantStore = create<TenantStore>()((set) => ({
  currentTenant: null,
  loading: false,
  setCurrentTenant: (tenant) => set({ currentTenant: tenant }),
  setLoading: (loading) => set({ loading }),
  clearTenantContext: () => set({ currentTenant: null, loading: false }),
}));
