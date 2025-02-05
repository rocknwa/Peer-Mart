import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCart = create()(
    persist(
      (set, get) => ({
        items: [],

        addProduct: (product: any) => 
            set((state: any) => ({ 
                items: [...state.items, { product, quantity: 1 }], 
            })),
        
        removeProduct: (product: any) => 
            set((state: any) => ({
                items: state.items.filter((item: any) => item.product !== product),
            })),
        
        resetCart: () => set({ items: [] }),
      }),
      {
        name: 'cart-storage', // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      },
    ),
) 

