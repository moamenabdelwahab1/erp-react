export const products = {
  'PRD001': { name: 'Laptop', defaultPrice: 999.99 },
  'PRD002': { name: 'Smartphone', defaultPrice: 599.99 },
  'PRD003': { name: 'Tablet', defaultPrice: 399.99 },
  'PRD004': { name: 'Desktop Computer', defaultPrice: 1299.99 },
  'PRD005': { name: 'Printer', defaultPrice: 199.99 },
  'PRD006': { name: 'Monitor', defaultPrice: 299.99 },
  'PRD007': { name: 'Keyboard', defaultPrice: 49.99 },
  'PRD008': { name: 'Mouse', defaultPrice: 29.99 },
  'PRD009': { name: 'Headphones', defaultPrice: 79.99 },
  'PRD010': { name: 'Speakers', defaultPrice: 89.99 }
};

export const getProductById = (id) => products[id];

export const getAllProducts = () => {
  return Object.entries(products).map(([id, product]) => ({
    id,
    ...product
  }));
}; 