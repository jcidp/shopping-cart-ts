interface ProductResponse {
  id: number,
  title: string,
  price: number,
  description?: string,
  category?: string,
  image: string,
  rating?: {
    rate: number,
    count: number,
  },
}

interface Product extends ProductResponse {
  cartQuantity: number,
}

type handleAddToCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  quantity: number,
  isEdit?: boolean) => void;

type handleRemoveFromCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

interface OutletContext {
  products: Product[],
  error: Error | null,
  isLoading: boolean,
  handleAddToCart: handleAddToCart,
  handleRemoveFromCart?: handleRemoveFromCart,
}

export type { 
  ProductResponse,
  Product,
  OutletContext,
  handleAddToCart,
  handleRemoveFromCart,
}