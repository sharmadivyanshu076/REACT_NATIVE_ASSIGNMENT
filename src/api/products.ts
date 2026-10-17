import { Product, ProductsResponse } from '@/types/product';

const BASE_URL = 'https://dummyjson.com/products';
const REQUEST_TIMEOUT_MS = 12000;

async function fetchWithTimeout(url: string, timeoutMs: number = REQUEST_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });
    return response;
  } catch (error: any) {
    if (error?.name === 'AbortError') {
      throw new Error('Request timed out. Please check your internet connection and try again.');
    }
    throw new Error(error?.message || 'Unable to connect to the server. Please check your connection.');
  } finally {
    clearTimeout(timer);
  }
}

export interface FetchProductsOptions {
  category?: string;
  limit?: number;
  skip?: number;
}

export async function fetchProducts(options: FetchProductsOptions = {}): Promise<Product[]> {
  const { category, limit = 30, skip = 0 } = options;

  let url = BASE_URL;

  if (category && category.trim().length > 0 && category !== 'all') {
    url = `${BASE_URL}/category/${encodeURIComponent(category.trim())}?limit=${limit}&skip=${skip}`;
  } else {
    url = `${BASE_URL}?limit=${limit}&skip=${skip}`;
  }

  const response = await fetchWithTimeout(url);

  if (!response.ok) {
    throw new Error(`Failed to load products (HTTP ${response.status}: ${response.statusText})`);
  }

  const data: ProductsResponse = await response.json();
  return data.products ?? [];
}

export async function fetchProductById(id: string | number): Promise<Product> {
  const cleanId = String(id).trim();
  if (!cleanId) {
    throw new Error('Product ID is required');
  }

  const url = `${BASE_URL}/${cleanId}`;
  const response = await fetchWithTimeout(url);

  if (response.status === 404) {
    throw new Error('Product not found (it may have been removed).');
  }

  if (!response.ok) {
    throw new Error(`Failed to load product details (HTTP ${response.status}: ${response.statusText})`);
  }

  const data: Product = await response.json();
  return data;
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const url = `${BASE_URL}/category-list`;
    const response = await fetchWithTimeout(url);
    if (!response.ok) return [];
    const data: string[] = await response.json();
    return Array.isArray(data) ? data : [];
  } catch {
    // If category list fails, return empty list gracefully
    return [];
  }
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}
