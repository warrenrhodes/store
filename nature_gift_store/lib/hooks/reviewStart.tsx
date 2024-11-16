// store/useReviewStore.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Define types for review interactions
type ReviewId = number | string;

interface ReviewInteraction {
  helpful: boolean;
  notHelpful: boolean;
}

interface ReviewInteractions {
  [key: ReviewId]: ReviewInteraction;
}

// Define the store state interface
interface ReviewStore {
  reviewInteractions: ReviewInteractions;
  getReviewInteraction: (reviewId: ReviewId) => ReviewInteraction;
  toggleHelpful: (reviewId: ReviewId) => void;
  toggleNotHelpful: (reviewId: ReviewId) => void;
  clearInteractions: () => void;
}

// Create the store with type safety
const useReviewStore = create(
  persist<ReviewStore>(
    (set, get) => ({
      reviewInteractions: {},

      // Get interaction state for a specific review
      getReviewInteraction: (reviewId: ReviewId): ReviewInteraction => {
        const state = get();
        return (
          state.reviewInteractions[reviewId] || {
            helpful: false,
            notHelpful: false,
          }
        );
      },

      // Toggle helpful status
      toggleHelpful: (reviewId: ReviewId): void => {
        set((state) => {
          const currentInteraction = state.reviewInteractions[reviewId] || {
            helpful: false,
            notHelpful: false,
          };

          // If already helpful, remove the interaction
          if (currentInteraction.helpful) {
            const { [reviewId]: _, ...rest } = state.reviewInteractions;
            return {
              reviewInteractions: rest,
            };
          }

          // If not helpful marked, mark as helpful and remove not helpful if exists
          return {
            reviewInteractions: {
              ...state.reviewInteractions,
              [reviewId]: {
                helpful: true,
                notHelpful: false,
              },
            },
          };
        });
      },

      // Toggle not helpful status
      toggleNotHelpful: (reviewId: ReviewId): void => {
        set((state) => {
          const currentInteraction = state.reviewInteractions[reviewId] || {
            helpful: false,
            notHelpful: false,
          };

          // If already not helpful, remove the interaction
          if (currentInteraction.notHelpful) {
            const { [reviewId]: _, ...rest } = state.reviewInteractions;
            return {
              reviewInteractions: rest,
            };
          }

          // If not marked as not helpful, mark as not helpful and remove helpful if exists
          return {
            reviewInteractions: {
              ...state.reviewInteractions,
              [reviewId]: {
                helpful: false,
                notHelpful: true,
              },
            },
          };
        });
      },

      // Clear all interactions
      clearInteractions: (): void => {
        set({ reviewInteractions: {} });
      },
    }),
    {
      name: "review-interactions",
      version: 1,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useReviewStore;

// Optional: Export types for use in components
export type { ReviewId, ReviewInteraction, ReviewInteractions, ReviewStore };
