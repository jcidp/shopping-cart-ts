import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest"
import ProductCard from "../components/ProductCard";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("ProductCard component", () => {
    const handleAddToCart = vi.fn();
    const handleRemoveFromCart = vi.fn();

    it("renders image and text of product", () => {
        const product = {
            id: 100,
            img: "test.com",
            price: 10,
            title: "test",
            cartQuantity: 1,
            image: "example",
        };

        render(<ProductCard product={product} handleAddToCart={() => {}} />);

        expect(screen.getByRole("img", {name: "test"})).toBeInTheDocument();
        expect(screen.getByText("test")).toBeInTheDocument();
        expect(screen.getByText("$10.00")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Add to cart"})).toBeInTheDocument();
    });

    it("calls 'Add to cart' Handler when clicked", async () => {
        const product = {
            id: 100,
            img: "test.com",
            price: 10,
            title: "test",
            cartQuantity: 1,
            image: "example",
        }
        const user = userEvent.setup();

        render(<ProductCard product={product} handleAddToCart={handleAddToCart} />);
        const btn = screen.getByRole("button", {name: "Add to cart"});

        expect(handleAddToCart).not.toHaveBeenCalled();

        await act(async () => {
            await user.click(btn);
        });

        expect(handleAddToCart).toHaveBeenCalledTimes(1);
    });

    it("renders 'edit' and 'remove from cart' buttons when inCart is true", () => {
        const product = {
            id: 100,
            img: "test.com",
            price: 10,
            title: "test",
            cartQuantity: 1,
            image: "example",
        };

        render(<ProductCard product={product} inCart={true} handleAddToCart={() => {}} />);
        
        expect(screen.getByRole("img", {name: "test"})).toBeInTheDocument();
        expect(screen.getByText("test")).toBeInTheDocument();
        expect(screen.getByText("$10.00")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Edit"})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Remove from cart"})).toBeInTheDocument();
    });

    it("calls 'handleRemoveFromCart' when button clicked", async () => {
        const product = {
            id: 100,
            img: "test.com",
            price: 10,
            title: "test",
            cartQuantity: 1,
            image: "example",
        };
        const user = userEvent.setup();

        render(<ProductCard product={product} inCart={true} handleRemoveFromCart={handleRemoveFromCart} handleAddToCart={() => {}} />);
        const btn = screen.getByRole("button", {name: "Remove from cart"});

        expect(handleRemoveFromCart).not.toHaveBeenCalled();

        await act(async () => {
            await user.click(btn);
        });

        expect(handleRemoveFromCart).toHaveBeenCalledTimes(1);
    });

    it("handles clicks on 'edit' and 'cancel' correctly, including rendering the different paths", async () => {
        const product = {
            id: 100,
            img: "test.com",
            price: 10,
            title: "test",
            cartQuantity: 1,
            image: "example",
        };
        const user = userEvent.setup();

        render(<ProductCard product={product} inCart={true} handleAddToCart={() => {}} />);
        const btn = screen.getByRole("button", {name: "Edit"});

        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.queryByLabelText("Quantity:")).toBeNull();
        expect(screen.queryByRole("button", {name: "Cancel"})).toBeNull();
        expect(screen.queryByRole("button", {name: "Confirm"})).toBeNull();
        
        await act(async () => {
            await user.click(btn);
        });

        expect(screen.getByLabelText("Quantity:")).toBeInTheDocument();
        expect(screen.queryByText("1")).toBeNull();
        expect(screen.getByRole("button", {name: "Confirm"})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Cancel"})).toBeInTheDocument();
        
        const cancel = screen.getByRole("button", {name: "Cancel"});

        await act(async () => {
            await user.click(cancel);
        });

        expect(screen.getByRole("button", {name: "Edit"})).toBeInTheDocument();
    });
});