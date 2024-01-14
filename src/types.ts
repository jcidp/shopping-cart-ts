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

export type { ProductResponse, Product }