// src/service/productService.ts

import apiClient from "../api/apiClient";
import type { Product } from "../types";

const BASE = "/api/v1/products";

// GET all products
export const getAllProducts = async (): Promise<Product[]> => {
    try {
        console.log(`Fetching products from: ${BASE}`);
        const res = await apiClient.get<Product[]>(BASE);
        console.log("Products response:", res.data);
        return res.data;
    } catch (error) {
        console.error("Error fetching all products:", error);
        throw error;
    }
};

// GET product by ID
export const getProductById = async (id: number): Promise<Product> => {
    try {
        const res = await apiClient.get<Product>(`${BASE}/${id}`);
        return res.data;
    } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        throw error;
    }
};

// CREATE product
export const createProduct = async (
    product: Omit<Product, "id">
): Promise<Product> => {
    try {
        const res = await apiClient.post<Product>(BASE, product);
        return res.data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

// UPDATE product
export const updateProduct = async (
    id: number,
    product: Omit<Product, "id">
): Promise<Product> => {
    try {
        const res = await apiClient.put<Product>(`${BASE}/${id}`, product);
        return res.data;
    } catch (error) {
        console.error(`Error updating product with id ${id}:`, error);
        throw error;
    }
};

// DELETE product
export const deleteProduct = async (id: number): Promise<void> => {
    try {
        await apiClient.delete(`${BASE}/${id}`);
    } catch (error) {
        console.error(`Error deleting product with id ${id}:`, error);
        throw error;
    }
};