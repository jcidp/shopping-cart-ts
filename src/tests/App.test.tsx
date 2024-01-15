import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import App from "../App";

const {mockedUseFetchAPI, mockedLink, mockedOutlet, mockedUseLocation} = vi.hoisted(() => ({
    mockedUseFetchAPI: vi.fn(),
    mockedLink: vi.fn(),
    mockedOutlet: vi.fn(),
    mockedUseLocation: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
    Link: mockedLink,
    Outlet: mockedOutlet,
    useLocation: mockedUseLocation,
}));

vi.mock("../hooks/useFetchAPI.js", () => ({
    default: mockedUseFetchAPI,
}));

vi.mock("../components/Cart.jsx", () => ({
    default: vi.fn(),
}));

interface MockedChildProps {
  context: {
    products: Array<{id: number, cartQuantity: number}>,
    error: string | null,
    isLoading: boolean,
  }
}

const MockedChild = ({context}: MockedChildProps) => {
    if (context.error) return <h2>Error</h2>;
    if (context.isLoading) return <h2>Loading...</h2>;

    return <div>
        {context.products.map(product => <div key={product.id}>Product with id #{product.id} and {product.cartQuantity} items in cart.</div>)}
    </div>
};

describe("App", () => {
    mockedLink.mockImplementation(({children}) => <a role="link">{children}</a>);
    mockedOutlet.mockImplementation(MockedChild);
    mockedUseLocation.mockReturnValue("/cart");

    it("renders child with products returned by useFetchAPI, adding cartQuantity", () => {
        mockedUseFetchAPI.mockReturnValue({
            data: [{id: 110}, {id: 111}, {id: 112}],
            error: null,
            isLoading: null, 
        });

        render(<App />);

        expect(screen.getAllByText(/^Product with id #\d+ and 0 items in cart.$/).length).toBe(3);
    });

    it("renders error in child if useFetchAPI returns an error", () => {
        mockedUseFetchAPI.mockReturnValue({
            data: null,
            error: "error",
            isLoading: false,
        });

        render(<App />);

        expect(screen.getByRole("heading", {name: "Error"})).toBeInTheDocument();
    });

    it("renders loading state in child when useFetchAPI returns isLoading as true", () => {
        mockedUseFetchAPI.mockReturnValue({
            data: null,
            error: null,
            isLoading: true,
        });

        render(<App />);

        expect(screen.getByRole("heading", {name: "Loading..."})).toBeInTheDocument();
    });
});