import { render, screen } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import Shop from "../components/Shop";
import { ProductCardProps } from "../components/ProductCard";

const mockedUseOutletContext = vi.hoisted(() => vi.fn());

vi.mock("react-router-dom", () => ({
    useOutletContext: mockedUseOutletContext,
}));

vi.mock("../components/ProductCard.jsx", () => ({
    default: ({product}: ProductCardProps) => (
        <div>Product with id #{product.id}</div>
    ),
}));

vi.mock("../components/Loader.jsx", () => ({
    default: () => (
        <h2>Loading...</h2>
    ),
}));

describe("Shop page", () => {
    it("Renders products when they exist", () => {
        mockedUseOutletContext.mockReturnValue({
            products: [
                {id: 97},
                {id: 98},
                {id: 99},
            ],
            error: null,
            isLoading: false,
            showCart: false,
        });

        render(<Shop />);

        expect(screen.getAllByText(/Product with id #\d+/).length).toBe(3);
    });

    it("Renders error message when there's an error", () => {
        mockedUseOutletContext.mockReturnValue({
            products: null,
            error: "error",
            isLoading: false,
            showCart: false,
        });

        render(<Shop />);

        expect(screen.getByRole("heading", {name: "Error loading data"})).toBeInTheDocument();
        expect(screen.getByText("Please try reloading the page.")).toBeInTheDocument();
    });

    it("Renders loading state when loading", () => {
        mockedUseOutletContext.mockReturnValue({
            products: null,
            error: null,
            isLoading: true,
            showCart: false,
        })

        render(<Shop />);

        expect(screen.getByRole("heading", {name: "Loading..."})).toBeInTheDocument();
    });
})