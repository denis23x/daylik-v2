import { create } from 'zustand';

interface FeedbackStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useFeedbackStore = create<FeedbackStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
