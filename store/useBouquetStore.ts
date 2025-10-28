import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";

interface Bouquet {
  id: string;
  name: string;
  price: number;
  image?: string;
  purchased: boolean;
  isSold: boolean;
}

interface BouquetStore {
  bouquets: Bouquet[];
  addBouquet: (bouquet: Omit<Bouquet, "id">) => void;
  updateBouquet: (id: string, updated: Partial<Bouquet>) => void;
  deleteBouquet: (id: string) => void;
  togglePurchased: (id: string) => void;
}

export const useBouquetStore = create<BouquetStore>()(
  persist(
    (set, get) => ({
      bouquets: [],

      addBouquet: (bouquet) => {
        const newBouquet = { id: uuidv4(), ...bouquet };
        set((state) => ({
          bouquets: [...state.bouquets, newBouquet],
        }));
      },

      updateBouquet: (id, updated) =>
        set((state) => ({
          bouquets: state.bouquets.map((b) =>
            b.id === id ? { ...b, ...updated } : b
          ),
        })),

      deleteBouquet: (id) =>
        set((state) => ({
          bouquets: state.bouquets.filter((b) => b.id !== id),
        })),

      togglePurchased: (id) =>
        set((state) => ({
          bouquets: state.bouquets.map((b) =>
            b.id === id ? { ...b, purchased: !b.purchased } : b
          ),
        })),
    }),
    {
      name: "bouquet-storage", // nama key di AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
