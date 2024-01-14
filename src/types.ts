interface ProductResponse {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: {
    rate: number,
    count: number,
  },
}

interface Product extends ProductResponse {
  cartQuantity: number,
}

interface OutletContext {
  products: Product[],
  error: Error | null,
  isLoading: boolean,
}

export type { ProductResponse, Product, OutletContext }