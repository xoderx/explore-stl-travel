import { create } from 'zustand';
import type { District } from '@shared/types';
interface DistrictState {
  currentDistrict: District;
  setDistrict: (district: District) => void;
}
export const useDistrictStore = create<DistrictState>((set) => ({
  currentDistrict: 'stl',
  setDistrict: (district) => set({ currentDistrict: district }),
}));