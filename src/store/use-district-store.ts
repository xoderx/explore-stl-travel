import { create } from 'zustand';
export type District = 'stl' | 'delmar';
interface DistrictState {
  currentDistrict: District;
  setDistrict: (district: District) => void;
}
export const useDistrictStore = create<DistrictState>((set) => ({
  currentDistrict: 'stl',
  setDistrict: (district) => set({ currentDistrict: district }),
}));