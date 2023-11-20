import { create } from "zustand";

const useFavStore = create((set) => ({
  fav_products: [],
  addFavProduct: (product) =>
    set((state) => {
      const hasProduct = state.fav_products.find((p) => p.id === product.id);
      if (!hasProduct) {
        return {
          fav_products: [...state.fav_products, { ...product, isFav: true }],
        };
      }
      return product;
    }),
  removeFavProduct: (product) =>
    set((state) => {
      return {
        fav_products: state.fav_products
          .map((p, index) => {
            if (p.id === product.id) {
              return {
                ...p,
                isFav: false,
              };
            }
            return p;
          })
          .filter((p) => p.isFav === true),
      };
    }),
}));

export default useFavStore;
