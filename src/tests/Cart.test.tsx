import { render, screen } from "@testing-library/react";
import { vi } from "vitest"
import Cart from "../components/Cart";
import { ProductCardProps } from "../components/ProductCard";
import { handleAddToCart } from "../types";

const {mockedUseLocation, mockedLink} = vi.hoisted(() => ({
    mockedUseLocation: vi.fn(),
    mockedLink: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
    useLocation: mockedUseLocation,
    Link: mockedLink,
}));

vi.mock("../components/ProductCard.jsx", () => {
    return {
        default: ({product}: ProductCardProps) => (
            <div>Product with id #{product.id}</div>
        ),
    };
});

vi.mock("../components/Loader.jsx", () => ({
    default: () => (
        <h2>Loading...</h2>
    ),
}));

mockedLink.mockImplementation(({children}) => <a role="link">{children}</a>);

const dummyHandleAddToCart: handleAddToCart = (e, quantity, isEdit) => ({e, quantity, isEdit});

describe("Cart", () => {
    it("render error when there's an error", () => {
        const mockedProps = {
            products: [],
            error: Error("test"),
            isLoading: false,
            handleAddToCart: dummyHandleAddToCart,
        };
        mockedUseLocation.mockReturnValue({pathname: "/cart"});

        render(<Cart {...mockedProps} />)

        expect(screen.getByRole("heading", {name: "Error loading data"}))
            .toBeInTheDocument();
        expect(screen.getByText("Please try reloading the page.")).toBeInTheDocument();
    });

    it("renders products correctly", () => {
        const mockedProps = {
            products: [
                {id: 7, price: 10, cartQuantity: 1, title: "test", image: "ex"},
                {id: 9, price: 20, cartQuantity: 2, title: "test", image: "ex"},
            ],
            error: null,
            isLoading: false,
            handleAddToCart: dummyHandleAddToCart,
        };
        mockedUseLocation.mockReturnValue({pathname: "/cart"});

        render(<Cart {...mockedProps} />)
        
        expect(screen.getByRole("heading", {name: "Cart total: $50.00"})).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "Go to Checkout"})).toBeInTheDocument();
        expect(screen.getAllByRole("link").length).toBe(1);
        expect(screen.getAllByText(/^Product with id #\d+/).length).toBe(2);
    });

    it("renders empty state with no products in cart", () => {
        const mockedProps = {
            products: [
                {id: 7, price: 10, cartQuantity: 0, title: "test", image: "ex"},
                {id: 9, price: 20, cartQuantity: 0, title: "test", image: "ex"},
            ],
            error: null,
            isLoading: false,
            handleAddToCart: dummyHandleAddToCart,
        };
        mockedUseLocation.mockReturnValue({pathname: "/cart"});

        render(<Cart {...mockedProps} />)

        expect(screen.getByRole("heading", {name: "Your cart is empty!"})).toBeInTheDocument();
        expect(screen.getByText(/Visit our shop and add what you like to your cart/)).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "Visit Shop"})).toBeInTheDocument();
        expect(screen.getAllByRole("link").length).toBe(1);
    });

    it("renders loading state", () => {
        const mockedProps = {
            products: [],
            error: null,
            isLoading: true,
            handleAddToCart: dummyHandleAddToCart,
        };
        mockedUseLocation.mockReturnValue({pathname: "/cart"});

        render(<Cart {...mockedProps} />)
        
        expect(screen.getByRole("heading", {name: "Loading..."})).toBeInTheDocument();
    });    

    it("renders empty state with special message when in /shop path", () => {
        const mockedProps = {
            products: [
                {id: 7, price: 10, cartQuantity: 0, title: "test", image: "ex"},
                {id: 9, price: 20, cartQuantity: 0, title: "test", image: "ex"},
            ],
            error: null,
            isLoading: false,
            handleAddToCart: dummyHandleAddToCart,
        };
        mockedUseLocation.mockReturnValue({pathname: "/shop"});

        render(<Cart {...mockedProps} />)

        expect(screen.getByText(/Add a product to your cart to see it here/)).toBeInTheDocument();
    });

    it("renders 'Go to Cart' anchor when not in /cart path' and there are products in cart", () => {
        const mockedProps = {
            products: [
                {id: 7, price: 10, cartQuantity: 1, title: "test", image: "ex"},
                {id: 9, price: 20, cartQuantity: 0, title: "test", image: "ex"},
            ],
            error: null,
            isLoading: false,
            handleAddToCart: dummyHandleAddToCart,
        };
        mockedUseLocation.mockReturnValue({pathname: "/shop"});

        render(<Cart {...mockedProps} />)

        expect(screen.getByRole("link", {name: "Go to Checkout"})).toBeInTheDocument();
        expect(screen.getByRole("link", {name: "Go to Cart"})).toBeInTheDocument();
        expect(screen.getAllByRole("link").length).toBe(2);
        expect(screen.getByRole("heading", {name: "Cart total: $10.00"})).toBeInTheDocument();
        expect(screen.getAllByText(/^Product with id #\d+/).length).toBe(1);
    });
});